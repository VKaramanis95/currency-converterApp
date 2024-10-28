<!-- src/App.vue -->
<template>
  <div id="app">
    <header>
      <h1>Currency Converter</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </nav>
    </header>
    <main>
      <router-view></router-view> <!-- This is where the routed components will be displayed -->
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Add your global styles here */
header {
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
}

nav {
  margin: 1rem 0;
}

nav a {
  margin: 0 1rem;
  text-decoration: none;
  color: #007bff;
}
</style>
