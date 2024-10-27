// models/Currency.js
const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true, // Ensure the code is unique
    },
    rate: {
        type: Number,
        required: true,
    },
});

const Currency = mongoose.model('currency', currencySchema);
module.exports = Currency;
