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

<style scoped>
.register {
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
