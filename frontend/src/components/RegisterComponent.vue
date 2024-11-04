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
      email: '',           
      username: '',
      password: '',
      confirmPassword: '',  
      error: null,          
      successMessage: null, 
    };
  },
  methods: {
    isPasswordStrong(password) {
      
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return strongPasswordRegex.test(password);
    },
    async register() {
      this.error = null;
      this.successMessage = null;

     
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match';
        return;
      }
      
      if (!this.isPasswordStrong(this.password)) {
        this.error = 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.';
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

        this.successMessage = 'Registration successful! Redirecting...';
        setTimeout(() => {
          this.$router.push('/');
        }, 2000); 
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
