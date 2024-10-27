const express = require('express');
const { convertCurrency, createCurrency, updateCurrency, deleteCurrency, getAllCurrencies } = require('../controllers/currencyController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/convert', convertCurrency); // Public
router.get('/', getAllCurrencies); // Public

// Private (Only authorized users)
router.post('/', authMiddleware, createCurrency);
router.put('/', authMiddleware, updateCurrency);
router.delete('/:code', authMiddleware, deleteCurrency);

module.exports = router;
