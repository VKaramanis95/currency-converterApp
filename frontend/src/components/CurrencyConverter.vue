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
        <div v-if="amountError" class="error">{{ amountError }}</div> 
      </div>
      <button type="submit">Convert</button>
    
      <button type="button" @click="resetForm">Refresh</button>
    </form>

    <div v-if="convertedAmount">
      <h3>Converted Amount: {{ convertedAmount }}</h3>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
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
      amountError: null, 
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
        this.amountError = 'Amount must be greater than 0.'; 
        return false;
      }
      this.amountError = null; 
      return true;
    },
    async convertCurrency() {
      this.error = null; 
      this.convertedAmount = null; 

      if (this.fromCurrency === this.toCurrency) {
        this.error = 'From and To currencies must be different.';
        return;
      }

      
      if (!this.validateCurrencyCode(this.fromCurrency) || !this.validateCurrencyCode(this.toCurrency)) {
        this.error = 'Currency codes must be exactly 3 letters (e.g., USD, EUR). Please enter valid codes.';
        return;
      }

      
      if (!this.validateAmount()) {
        return; 
      }

      console.log('Converting:', this.amount, this.fromCurrency, this.toCurrency); 
      try {
        const response = await axios.post('http://localhost:5000/api/conversion/convert', {
          from: this.fromCurrency, 
          to: this.toCurrency,    
          originalAmount: this.amount, 
        });
        console.log('Response:', response.data); 
        this.convertedAmount = response.data.convertedAmount; 
      } catch (err) {
        console.error(err); 
        this.error = err.response ? err.response.data.message : 'Network Error'; 
      }
    },
   
    resetForm() {
      this.amount = null;
      this.fromCurrency = '';
      this.toCurrency = '';
      this.convertedAmount = null;
      this.error = null; 
      this.amountError = null; 
    },
 
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
  color: #007bff; 
}

.swap-icon:hover {
  color: #0056b3;
}
</style>








