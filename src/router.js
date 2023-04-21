import { createRouter, createWebHistory } from "vue-router";

// pages
import AppHomepage from './pages/AppHomepage.vue';
import TypeShow from './pages/TypeShow.vue';
import RestaurantMenu from './pages/RestaurantMenu.vue';
import Checkout from './pages/Checkout.vue';
import NotFound from './pages/NotFound.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHomepage
        },
        {
            path: '/categoria/:name',
            name: 'type-show',
            component: TypeShow
        },
        {
            path: '/Attivita:id',
            name: 'restaurant-menu',
            component: RestaurantMenu
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound
        },
    ]
});

export { router };
