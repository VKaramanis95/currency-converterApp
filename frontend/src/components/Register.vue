<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div> <!-- Display error messages -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterComponent', // Multi-word name
  data() {
    return {
      username: '',
      password: '',
      error: null, // To store error messages
    };
  },
  methods: {
    async register() {
      this.error = null; // Reset error before the request
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          username: this.username,
          password: this.password,
        });
        const token = response.data.token; // Get the token from the response
        localStorage.setItem('token', token); // Store the token in local storage
        // Optionally, redirect the user or show a success message
        alert('Registration successful!'); // You can replace this with a better UI feedback
      } catch (err) {
        console.error(err); // Log the error for debugging
        this.error = err.response ? err.response.data.message : 'Network Error'; // Handle errors gracefully
      }
    },
  },
};
</script>