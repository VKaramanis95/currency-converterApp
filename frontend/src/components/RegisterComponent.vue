<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required />
      <button type="submit">Register</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterComponent',
  data() {
    return {
      email: '',           // New email field
      username: '',
      password: '',
      confirmPassword: '',  // New confirm password field
      error: null,          // To store error messages
      successMessage: null, // To store success messages
    };
  },
  methods: {
    async register() {
      this.error = null;
      this.successMessage = null;

      // Check if passwords match
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match';
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          email: this.email,
          username: this.username,
          password: this.password,
        });
        const token = response.data.token;
        localStorage.setItem('token', token);

        // Show success message and redirect to main page
        this.successMessage = 'Registration successful! Redirecting...';
        setTimeout(() => {
          this.$router.push('/');
        }, 2000); // Adjust delay as needed
      } catch (err) {
        console.error(err);
        this.error = err.response ? err.response.data.message : 'Network Error';
      }
    },
  },
};
</script>

<style>
.success {
  color: green;
  margin-top: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
