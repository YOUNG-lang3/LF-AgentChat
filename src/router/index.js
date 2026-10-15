import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '../mainpages/LoginPage.vue'
import HomePage from '../mainpages/HomePage.vue'
import NotFoundPage from '../mainpages/NotFoundPage.vue'

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
    },
    {
        path: '/home',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundPage,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router