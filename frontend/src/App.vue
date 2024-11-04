<template>
  <div id="app">
    <header>
      <h1>Currency Converter App</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <template v-if="isLoggedIn">
          <button @click="goToCurrencyManager">Currency Manager</button>
          <button @click="logout">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
        </template>
      </nav>
    </header>
    <main>
      <router-view @login-success="isLoggedIn = true"></router-view>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'; 
import { useRouter } from 'vue-router'; 

export default {
  name: 'App',
  setup() {
    const router = useRouter(); 
    const isLoggedIn = ref(!!localStorage.getItem('token')); 

    const logout = () => {
      localStorage.removeItem('token'); 
      isLoggedIn.value = false; 
      router.push('/'); 
    };
    const goToCurrencyManager = () => {
      router.push('/manage-currencies'); 
    };

    return { isLoggedIn, logout, goToCurrencyManager };
  },
};
</script>


