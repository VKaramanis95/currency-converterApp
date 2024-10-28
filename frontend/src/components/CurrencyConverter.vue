<template>
    <div class="currency-converter">
      <h2>Currency Converter</h2>
      <form @submit.prevent="convertCurrency">
        <div>
          <label for="fromCurrency">From Currency:</label>
          <input v-model="fromCurrency" type="text" placeholder="e.g., USD" required />
        </div>
        <div>
          <label for="toCurrency">To Currency:</label>
          <input v-model="toCurrency" type="text" placeholder="e.g., EUR" required />
        </div>
        <div>
          <label for="amount">Amount:</label>
          <input v-model="amount" type="number" required />
        </div>
        <button type="submit">Convert</button>
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
      };
    },
    methods: {
      async convertCurrency() {
        this.error = null; // Reset error before the request
        this.convertedAmount = null; // Reset the converted amount
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
    },
  };
  </script>
  
  <style scoped>
  .currency-converter {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }
  
  h2 {
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-top: 10px;
  }
  
  input {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
  </style>
  