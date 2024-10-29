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
      <router-view @login-success="isLoggedIn = true"></router-view> <!-- Listen for login success -->
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'; // Import ref
import { useRouter } from 'vue-router'; // Import useRouter

export default {
  name: 'App',
  setup() {
    const router = useRouter(); // Use the router
    const isLoggedIn = ref(!!localStorage.getItem('token')); // Reactive variable

    const logout = () => {
      localStorage.removeItem('token'); // Clear the token
      isLoggedIn.value = false; // Update the reactive variable
      router.push('/'); // Redirect to home after logout
    };
    const goToCurrencyManager = () => {
      router.push('/manage-currencies'); // Navigate to the Currency Manager page
    };

    return { isLoggedIn, logout, goToCurrencyManager };
  },
};
</script>


