<template>
  <div class="currency-manager">
    <h2>Currency Management</h2>
    <form @submit.prevent="addCurrency" class="currency-form">
      <input
        v-model="newCurrency.code"
        class="currency-input"
        placeholder="Currency Code (e.g., USD)"
        required
        aria-label="Currency Code"
      />
      <input
        v-model="newCurrency.rate"
        type="number"
        step="any"
        class="currency-input"
        placeholder="Exchange Rate"
        required
        aria-label="Exchange Rate"
      />
      <button type="submit" class="submit-button">Add Currency</button>
    </form>

    <div v-if="loading" class="loading">Loading currencies...</div>

    <div>
      <input
        v-model="searchQuery"
        class="currency-search"
        placeholder="Search for a currency..."
        aria-label="Search Currency"
      />
    </div>

    
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">{{ success }}</div>
    

    <div v-if="filteredCurrencies.length && !loading">
      <h3>Existing Currencies</h3>
      <ul class="currency-list">
        <li
          v-for="currency in filteredCurrencies"
          :key="currency._id.$oid"
          class="currency-item"
        >
          <span v-if="!currency.isEditing">{{ currency.code }}: {{ currency.rate }}</span>
          <div v-if="currency.isEditing">
            <input
              v-model="currency.newRate"
              type="number"
              step="any"
              class="currency-input"
              placeholder="New Exchange Rate"
              required
              aria-label="New Exchange Rate"
            />
            <button @click="updateCurrency(currency)" class="action-button">Save</button>
            <button @click="cancelEdit(currency)" class="action-button">Cancel</button>
          </div>
          <div v-if="!currency.isEditing" class="button-group">
            <button @click="editCurrency(currency)" class="action-button">Edit</button>
            <button @click="deleteCurrency(currency._id)" class="action-button delete">Delete</button>
          </div>
        </li>
      </ul>
    </div>
    
  </div>
</template>

  
  
  <script>
  import axios from 'axios';
import { useRouter } from 'vue-router';

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
      success: null,
      loading: false,
      searchQuery: '',
    };
  },
  created() {
    this.fetchCurrencies();
  },
  computed: {
    filteredCurrencies() {
      const query = this.searchQuery.toLowerCase();
      return this.currencies.filter(currency =>
        currency.code.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchCurrencies() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:5000/api/currency/');
        this.currencies = response.data.map(currency => ({
          ...currency,
          isEditing: false,
          newRate: currency.rate,
        }));
      } catch (err) {
        this.error = 'Failed to fetch currencies';
      } finally {
        this.loading = false;
      }
    },

    async addCurrency() {
      this.error = null; 
      this.success = null; 

      if (!this.validateCurrencyCode(this.newCurrency.code)) {
        this.error = 'Currency code must be exactly 3 letters';
        return;
      }

      // Check if currency already exists
      const existingCurrency = this.currencies.find(currency => currency.code === this.newCurrency.code.toUpperCase());
      if (existingCurrency) {
        this.error = 'Currency already exists! Please provide a unique currency code.';
        return;
      }

      try {
        await axios.post('http://localhost:5000/api/currency', {
          code: this.newCurrency.code.toUpperCase(),
          rate: this.newCurrency.rate,
        });
        this.newCurrency.code = '';
        this.newCurrency.rate = null;
        this.fetchCurrencies(); // Refresh the list
        this.success = 'Currency added successfully!'; 
      } catch (err) {
        this.error = 'Failed to add currency';
      }
    },

    async deleteCurrency(id) {
      this.error = null;
      this.success = null; 
      try {
        await axios.delete(`http://localhost:5000/api/currency/${id}`);
        this.fetchCurrencies(); 
        this.success = 'Currency deleted successfully!'; 
      } catch (err) {
        this.error = 'Failed to delete currency';
      }
    },

    editCurrency(currency) {
      currency.isEditing = true;
    },

    cancelEdit(currency) {
      currency.isEditing = false;
      currency.newRate = currency.rate;
    },

    async updateCurrency(currency) {
      this.error = null;
      this.success = null; 
      try {
        await axios.put(`http://localhost:5000/api/currency/${currency.code}`, {
          rate: currency.newRate,
        });
        currency.rate = currency.newRate;
        currency.isEditing = false;
        this.fetchCurrencies(); // Refresh the list
        this.success = 'Currency updated successfully!'; 
        this.searchQuery = '';

        
      } catch (err) {
        this.error = 'Failed to update currency! It must be only numbers and greater than 0!';
      }
    },




    validateCurrencyCode(code) {
      return /^[A-Z]{3}$/.test(code.toUpperCase());
    },

    logout() {
      localStorage.removeItem('token'); 
      const router = useRouter(); 
      router.push('/');
    },
  },
};

  </script>
  