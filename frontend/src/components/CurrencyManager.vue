<template>
    <div class="currency-manager">
      <h2>Currency Management</h2>
      <form @submit.prevent="addCurrency">
        <input v-model="newCurrency.code" placeholder="Currency Code (e.g., USD)" required />
        <input v-model="newCurrency.rate" type="number" placeholder="Exchange Rate" required />
        <button type="submit">Add Currency</button>
      </form>
  
      <div v-if="currencies.length">
        <h3>Existing Currencies</h3>
        <ul>
          <li v-for="currency in currencies" :key="currency._id">
            <span>{{ currency.code }}: {{ currency.exchangeRateToUSD }}</span>
            <button @click="editCurrency(currency)">Edit</button>
            <button @click="deleteCurrency(currency._id)">Delete</button>
          </li>
        </ul>
      </div>
  
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router'; // Import useRouter
  
  export default {
    name: 'CurrencyManager',
    data() {
      return {
        currencies: [],
        newCurrency: {
          code: '',
          rate: null,
        },
        error: null,
      };
    },
    created() {
      this.fetchCurrencies();
    },
    methods: {
      async fetchCurrencies() {
        try {
          const response = await axios.get('http://localhost:5000/api/currencies');
          this.currencies = response.data;
        } catch (err) {
          this.error = 'Failed to fetch currencies';
        }
      },
      async addCurrency() {
        this.error = null;
        try {
          await axios.post('http://localhost:5000/api/currency', {
            code: this.newCurrency.code,
            rate: this.newCurrency.rate,
          });
          this.newCurrency.code = '';
          this.newCurrency.rate = null;
          this.fetchCurrencies(); // Refresh the list
        } catch (err) {
          this.error = 'Failed to add currency';
        }
      },
      async deleteCurrency(id) {
        this.error = null;
        try {
          await axios.delete(`http://localhost:5000/api/currency/${id}`);
          this.fetchCurrencies(); // Refresh the list
        } catch (err) {
          this.error = 'Failed to delete currency';
        }
      },
      async editCurrency(currency) {
        const newRate = prompt('Enter new exchange rate:', currency.exchangeRateToUSD);
        if (newRate !== null) {
          this.error = null;
          try {
            await axios.put(`http://localhost:5000/api/currency/${currency.code}`, {
              rate: newRate,
            });
            this.fetchCurrencies(); // Refresh the list
          } catch (err) {
            this.error = 'Failed to update currency';
          }
        }
      },
      logout() {
        localStorage.removeItem('token'); // Clear the token
        const router = useRouter(); // Use the router
        router.push('/'); // Redirect to the main page
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  