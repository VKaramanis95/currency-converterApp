// routes/currencyRoutes.js

const express = require('express');
const mongoose = require('mongoose');
const { body, param, validationResult } = require('express-validator');
const Currency = require('../models/currency'); // Adjust path if necessary
const router = express.Router();

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }
    next();
};

// POST: Add a new currency with validation
router.post(
    '/',
    [
        body('code')
            .isLength({ min: 3, max: 3 })
            .withMessage('Currency code must be exactly 3 letters.')
            .isAlpha()
            .withMessage('Currency code must contain only letters.')
            .toUpperCase(),
        body('rate')
            .isFloat({ gt: 0 })
            .withMessage('Exchange rate must be a positive number.'),
    ],
    handleValidationErrors,
    async (req, res) => {
        const { code, rate } = req.body;

        try {
            // Check if the currency code already exists
            let currency = await Currency.findOne({ code });
            if (currency) {
                return res.status(400).json({ message: 'Currency code already exists' });
            }

            // Create a new currency document
            currency = new Currency({ code, rate });
            await currency.save();
            return res.status(201).json(currency);
        } catch (error) {
            console.error('Error adding currency:', error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
);

// READ: Get all currencies
router.get('/', async (req, res) => {
    try {
        const currencies = await Currency.find();
        return res.status(200).json(currencies);
    } catch (error) {
        console.error('Error fetching currencies:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// GET: Retrieve a specific currency by code
router.get('/:code', async (req, res) => {
    const { code } = req.params;

    try {
        const currency = await Currency.findOne({ code });
        if (!currency) {
            return res.status(404).json({ message: 'Currency not found' });
        }
        return res.status(200).json(currency);
    } catch (error) {
        console.error('Error retrieving currency:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// UPDATE: Update the rate of a currency by code or ID with validation
router.put(
    '/:identifier',
    [
        param('identifier').custom((value) => {
            // Allow identifier to be either a 3-letter code or a valid ObjectId
            return /^[A-Z]{3}$/.test(value) || mongoose.Types.ObjectId.isValid(value);
        }).withMessage('Identifier must be a 3-letter code or a valid ObjectId.'),
        body('rate')
            .isFloat({ gt: 0 })
            .withMessage('Exchange rate must be a positive number.'),
    ],
    handleValidationErrors,
    async (req, res) => {
        const { identifier } = req.params;
        const { rate } = req.body;

        try {
            const isObjectId = mongoose.Types.ObjectId.isValid(identifier);
            const currency = await Currency.findOneAndUpdate(
                { $or: [{ _id: isObjectId ? identifier : undefined }, { code: identifier }] },
                { rate },
                { new: true }
            );

            if (!currency) {
                return res.status(404).json({ message: 'Currency not found' });
            }

            return res.status(200).json(currency);
        } catch (error) {
            console.error('Error updating currency:', error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
);

// DELETE: Remove a currency by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const currency = await Currency.findByIdAndDelete(id);
        if (!currency) {
            return res.status(404).json({ message: 'Currency not found' });
        }
        return res.status(200).json({ message: 'Currency deleted' });
    } catch (error) {
        console.error('Error deleting currency:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
