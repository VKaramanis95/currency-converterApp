const Currency = require('../models/currency');

// Convert currency
exports.convertCurrency = async (req, res) => {
  const { fromCurrency, toCurrency, amount } = req.body;

  try {
    const from = await Currency.findOne({ code: fromCurrency });
    const to = await Currency.findOne({ code: toCurrency });

    if (!from || !to) {
      return res.status(404).json({ message: 'Currency not found' });
    }

    const convertedAmount = (amount / from.exchangeRateToUSD) * to.exchangeRateToUSD;
    res.json({ convertedAmount });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// CRUD operations
exports.createCurrency = async (req, res) => {
  const { code, exchangeRateToUSD } = req.body;
  try {
    const currency = new Currency({ code, exchangeRateToUSD });
    await currency.save();
    res.json(currency);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCurrency = async (req, res) => {
  const { code, exchangeRateToUSD } = req.body;

  // Validate exchange rate
  if (exchangeRateToUSD <= 0) {
    return res.status(400).json({ message: 'Exchange rate must be greater than 0' });
  }

  try {
    const currency = await Currency.findOneAndUpdate(
      { code },
      { exchangeRateToUSD },
      { new: true }
    );

    if (!currency) return res.status(404).json({ message: 'Currency not found' });

    res.json(currency);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteCurrency = async (req, res) => {
  const { code } = req.params;
  try {
    const currency = await Currency.findOneAndDelete({ code });
    if (!currency) return res.status(404).json({ message: 'Currency not found' });
    res.json({ message: 'Currency deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllCurrencies = async (req, res) => {
  try {
    const currencies = await Currency.find();
    res.json(currencies);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
