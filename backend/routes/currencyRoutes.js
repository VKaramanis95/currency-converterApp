const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const Currency = require('../models/currency'); // Adjust the path as necessary
const router = express.Router();

// CREATE: Add a new currency
router.post('/', async (req, res) => {
    const { code, rate } = req.body;

    try {
        // Check if currency already exists
        const existingCurrency = await Currency.findOne({ code });
        if (existingCurrency) {
            return res.status(400).json({ message: 'Currency with this code already exists.' });
        }

        // Create new currency
        const currency = new Currency({ code, rate });
        await currency.save();
        return res.status(201).json(currency);
    } catch (error) {
        console.error('Error adding currency:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

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
    const { code } = req.params;  // Extract the currency code from the request parameters

    try {
        const currency = await Currency.findOne({ code });  // Find the currency by code
        if (!currency) {
            return res.status(404).json({ message: 'Currency not found' });
        }
        return res.status(200).json(currency);  // Return the found currency
    } catch (error) {
        console.error('Error retrieving currency:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// UPDATE: Update the rate of a currency by code or ID
router.put('/:identifier', async (req, res) => {
    const { identifier } = req.params; // Can be code or ID
    const { rate } = req.body; // Expecting rate in the request body

    try {
        // Ensure rate is provided
        if (rate === undefined) {
            return res.status(400).json({ message: 'Rate is required.' });
        }

        // Check if identifier is a valid ObjectId
        const isObjectId = mongoose.Types.ObjectId.isValid(identifier);

        // Find the currency by code or ID
        const currency = await Currency.findOneAndUpdate(
            { $or: [{ _id: isObjectId ? identifier : undefined }, { code: identifier }] },
            { rate },
            { new: true } // Return the updated document
        );

        // Check if currency was found
        if (!currency) {
            return res.status(404).json({ message: 'Currency not found' });
        }

        return res.status(200).json(currency); // Return the updated currency
    } catch (error) {
        console.error('Error updating currency:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Server error', error: error.message }); // Return error message
    }
});

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

module.exports = router; // Make sure to export the router
