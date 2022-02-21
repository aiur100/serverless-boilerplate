import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/Home.vue'
import Register from '/src/views/Register.vue';
import Login from '/src/views/Login.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router