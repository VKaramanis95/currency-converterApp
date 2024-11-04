const express = require('express');
const currency = require('../models/currency'); 
const router = express.Router();

router.post('/convert', async (req, res) => {
    const { from, to, originalAmount } = req.body;

    try {
        const fromCurrency = await currency.findOne({ code: from });
        const toCurrency = await currency.findOne({ code: to });

         
         if (!fromCurrency) {
                return res.status(404).json({ message: `Sorry, the currency '${from}' is not in the database.` });
         }

         
         if (!toCurrency) {
                return res.status(404).json({ message: `Sorry, the currency '${to}' is not in the database.` });
         }

        const convertedAmount = (originalAmount / fromCurrency.rate) * toCurrency.rate;

        return res.json({
            from,
            to,
            originalAmount,
            convertedAmount
        });
    } catch (error) {
        console.error("Error converting currency:", error.message);
        return res.status(500).json({ message: "Error converting currency", error: error.message });
    }
});

module.exports = router;
