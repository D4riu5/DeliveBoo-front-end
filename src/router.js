import { createRouter, createWebHistory } from "vue-router";

// pages
import AppHomepage from './pages/AppHomepage.vue';
import TypeShow from './pages/TypeShow.vue';
import RestaurantMenu from './pages/RestaurantMenu.vue';
import Checkout from './pages/Checkout.vue';
import NotFound from './pages/NotFound.vue';
import success from './pages/Success.vue';
import AboutUs from './pages/AboutUs.vue';
import Component2 from './components/Component2.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHomepage
        },
        {
            path: '/cerca-ristorante',
            name: 'cerca-ristorante',
            component: Component2
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
            path: '/success',
            name: 'success',
            component: success
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound
        },
        {
            path: '/about-us',
            name: 'about-us',
            component: AboutUs
        },
    ]
});

export { router };
