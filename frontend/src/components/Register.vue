<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterComponent', // Change to a multi-word name
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      register() {
        // Add your registration logic here
      },
    },
  };
  </script>
  