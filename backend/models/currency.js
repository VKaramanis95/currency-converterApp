// models/Currency.js
const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true, 
        uppercase: true,
        minlength: 3,
        maxlength: 3,
    },
    rate: {
        type: Number, 
        required: true,
        validate: {
            validator: Number.isFinite, 
            message: props => `${props.value} is not a valid rate!`,
        },
        min: [0, 'Rate must be greater than 0'], 
    },
});

const Currency = mongoose.model('currency', currencySchema);
module.exports = Currency;
