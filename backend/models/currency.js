// models/Currency.js
const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true, // Ensure the code is unique
        uppercase: true,
        minlength: 3,
        maxlength: 3,
    },
    rate: {
        type: Number, // Enforce rate as a Number (accepts float or int)
        required: true,
        validate: {
          validator: Number.isFinite, // Ensure the rate is a finite number
          message: props => `${props.value} is not a valid rate!`,
        },
      },
});

const Currency = mongoose.model('currency', currencySchema);
module.exports = Currency;
