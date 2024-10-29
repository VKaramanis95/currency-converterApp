<template>
  <div class="currency-converter">
    <h2>Currency Converter</h2>
    <form @submit.prevent="convertCurrency">
      <div class="currency-inputs">
        <div>
          <label for="fromCurrency">From Currency:</label>
          <input
            v-model="fromCurrency"
            @input="convertToUppercase('fromCurrency')"
            type="text"
            placeholder="e.g., USD"
            required
          />
        </div>
        
        <!-- Swap Icon -->
        <div class="swap-icon" @click="swapCurrencies">
          <i class="fas fa-exchange-alt"></i>
        </div>
        
        <div>
          <label for="toCurrency">To Currency:</label>
          <input
            v-model="toCurrency"
            @input="convertToUppercase('toCurrency')"
            type="text"
            placeholder="e.g., EUR" 
            required
          />
        </div>
      </div>
      
      <div>
        <label for="amount">Amount:</label>
        <input v-model="amount" type="number" step="any" required />
        <div v-if="amountError" class="error">{{ amountError }}</div> <!-- Display amount error message -->
      </div>
      <button type="submit">Convert</button>
      <!-- Add the Refresh button -->
      <button type="button" @click="resetForm">Refresh</button>
    </form>

    <div v-if="convertedAmount">
      <h3>Converted Amount: {{ convertedAmount }}</h3>
    </div>

    <div v-if="error" class="error">{{ error }}</div> <!-- Display any error messages -->
  </div>
</template>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      amount: null,
      fromCurrency: '',
      toCurrency: '',
      convertedAmount: null,
      error: null,
      amountError: null, // amount validation
    };
  },
  methods: {
    convertToUppercase(currencyType) {
      this[currencyType] = this[currencyType].toUpperCase();
    },
    validateCurrencyCode(code) {
      return /^[A-Z]{3}$/.test(code);
    },
    validateAmount() {
      if (this.amount <= 0) {
        this.amountError = 'Amount must be greater than 0.'; // Set the error message
        return false;
      }
      this.amountError = null; // Clear error if valid
      return true;
    },
    async convertCurrency() {
      this.error = null; // Reset error before the request
      this.convertedAmount = null; // Reset the converted amount

      // Validate currency codes
      if (!this.validateCurrencyCode(this.fromCurrency) || !this.validateCurrencyCode(this.toCurrency)) {
        this.error = 'Currency codes must be exactly 3 letters (e.g., USD, EUR). Please enter valid codes.';
        return;
      }

      // Validate amount
      if (!this.validateAmount()) {
        return; // Stop execution if amount is invalid
      }

      console.log('Converting:', this.amount, this.fromCurrency, this.toCurrency); // Log input values
      try {
        const response = await axios.post('http://localhost:5000/api/conversion/convert', {
          from: this.fromCurrency, // Match the backend's expected field
          to: this.toCurrency,     // Match the backend's expected field
          originalAmount: this.amount, // Match the backend's expected field
        });
        console.log('Response:', response.data); // Log the response
        this.convertedAmount = response.data.convertedAmount; // Adjust based on your API response
      } catch (err) {
        console.error(err); // Log the error for debugging
        this.error = err.response ? err.response.data.message : 'Network Error'; // Handle errors gracefully
      }
    },
    // Method to reset the form
    resetForm() {
      this.amount = null;
      this.fromCurrency = '';
      this.toCurrency = '';
      this.convertedAmount = null;
      this.error = null; // Clear any error message
      this.amountError = null; // Clear amount error message
    },
    // Method to swap the currency values
    swapCurrencies() {
      const temp = this.fromCurrency;
      this.fromCurrency = this.toCurrency;
      this.toCurrency = temp;
    },
  },
};
</script>


<style scoped>
.currency-inputs {
  display: flex;
  align-items: center;
}

.swap-icon {
  cursor: pointer;
  margin: 0 10px;
  font-size: 1.5em;
  color: #007bff; /* Change color to match your design */
}

.swap-icon:hover {
  color: #0056b3; /* Change hover color to match your design */
}
</style>








