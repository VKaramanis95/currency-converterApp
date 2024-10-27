const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    code: { type: String, required: true },
    rate: { type: Number, required: true }
});

// Use `mongoose.models` to check if the model already exists
const Currency = mongoose.models.currency || mongoose.model('currency', currencySchema);

module.exports = Currency;
