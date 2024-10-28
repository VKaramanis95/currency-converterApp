<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div> <!-- Display error messages -->
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router'; // Import useRouter

export default {
  name: 'LoginComponent', // Multi-word name
  data() {
    return {
      username: '',
      password: '',
      error: null, // To store error messages
    };
  },
  setup() {
    const router = useRouter(); // Use the router in setup
    return { router };
  },
  methods: {
  async login() {
    this.error = null; // Reset error before the request
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username: this.username,
        password: this.password,
      });
      const token = response.data.token; // Get the token from the response
      localStorage.setItem('token', token); // Store the token in local storage
      this.$emit('login-success'); // Emit an event to notify the parent component
      this.router.push('/manage-currencies'); // Redirect to CurrencyManager
    } catch (err) {
      console.error(err); // Log the error for debugging
      this.error = err.response ? err.response.data.message : 'Network Error'; // Handle errors gracefully
    }
  },
},

};
</script>

<style scoped>
.login {
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
