<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router'; 

export default {
  name: 'LoginComponent',
  data() {
    return {
      username: '',
      password: '',
      error: null, 
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
  async login() {
    this.error = null; 
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username: this.username,
        password: this.password,
      });
      const token = response.data.token; 
      localStorage.setItem('token', token); 
      this.$emit('login-success'); 
      this.router.push('/manage-currencies'); 
    } catch (err) {
      console.error(err); 
      this.error = err.response ? err.response.data.message : 'Network Error'; 
    }
  },
},

};
</script>