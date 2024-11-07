import { createRouter, createWebHistory } from 'vue-router';
import CurrencyConverter from '../components/CurrencyConverter.vue';
import CurrencyManager from '../components/CurrencyManager.vue';
import Login from '../components/LoginComponent.vue';
import Register from '../components/RegisterComponent.vue';

const routes = [
    { path: '/', component: CurrencyConverter },
    { path: '/login', component: Login }, 
    { path: '/register', component: Register }, 
    { path: '/manage-currencies', component: CurrencyManager }, 
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token'); 

    if (to.path === '/manage-currencies' && !isAuthenticated) {
        const registerIndex = routes.findIndex(route => route.path === '/register');
        if (registerIndex !== -1) {
            routes.splice(registerIndex, 1);
        }
    }
    
    if (to.path === '/manage-currencies' && !isAuthenticated) {
        next('/login'); 
    } 
    
    else if (to.path === '/login' && isAuthenticated) {
        next('/'); 
    }
    else if (to.path === '/register' && isAuthenticated) {
        next('/'); 
    }
    
    else if (to.path === '/logout') {
        next('/'); 
    }    
    else {
        next();
    }
});

export default router;
