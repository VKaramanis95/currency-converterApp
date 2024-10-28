<template>
  <div id="app">
    <header>
      <h1>Currency Converter App</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <template v-if="isLoggedIn">
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

    return { isLoggedIn, logout };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

header {
  background-color: #f8f9fa;
  padding: 20px;
  border-bottom: 1px solid #ccc;
}

nav {
  margin: 10px 0;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #007bff;
}

nav button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1em;
}

nav a:hover, nav button:hover {
  text-decoration: underline;
}

main {
  padding: 20px;
}
</style>
