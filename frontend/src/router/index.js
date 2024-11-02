import { createRouter, createWebHistory } from 'vue-router';
import CurrencyConverter from '../components/CurrencyConverter.vue';
import CurrencyManager from '../components/CurrencyManager.vue';
import Login from '../components/LoginComponent.vue';
import Register from '../components/RegisterComponent.vue';

const routes = [
    { path: '/', component: CurrencyConverter }, // Home page with currency converter
    { path: '/login', component: Login }, // Login page
    { path: '/register', component: Register }, // Registration page
    { path: '/manage-currencies', component: CurrencyManager }, // Currency management page
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Optional: Add navigation guards for protected routes
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists
    if (to.path === '/manage-currencies' && !isAuthenticated) {
        next('/login'); // Redirect to login if not authenticated
    } else {
        next(); // Proceed to the route
    }
});

export default router;
