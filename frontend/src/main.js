
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../../frontend/src/assets/style.css';

const app = createApp(App);

app.use(router); // Use the router
app.mount('#app'); // Mount the app to the DOM
