<script>
// Helpers
import axios from "axios";
import { store } from "../store";

export default {
    name: "AppHomepage",
    components: {},
    data() {
        return {
            store,
        };
    },
    methods: {
        // APIs
        getFoods() {
            axios
                .get(
                    this.store.backEndLink +
                        `/api/restaurants/${this.$route.params.id}/foods`
                )
                .then((resp) => {
                    if (resp.data.restaurant && resp.data.foods) {
                        this.store.restaurant = resp.data.restaurant;
                        this.store.foods = resp.data.foods;
                    } else {
                        this.$router.push({ name: "not-found" });
                    }
                });
        },

        // SHOPPING CART
        addToCart(item) {
            if (
                this.store.cart.length &&
                this.store.cart[0].restaurant_id !== item.restaurant_id
            ) {
                alert(
                    "Puoi ordinare da un solo Ristorante alla volta! Svuota il carello per ordinare da un altro ristorante!"
                );
                return;
            }

            // Check if the item already exists in the cart
            const cartItemIndex = this.store.cart.findIndex(
                (cartItem) => cartItem.id === item.id
            );

            // If the item already exists in the cart, increase its quantity by 1
            if (cartItemIndex >= 0) {
                this.store.cart[cartItemIndex].quantity++;
            } else {
                // If the item doesn't exist in the cart, add it with a quantity of 1
                this.store.cart.push({ ...item, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(this.store.cart));
        },
    },
    created() {
        this.getFoods();
    },
    // mounted() {
    //     this.store.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    // },
};
</script>

<template>
    <div v-if="store.foods.length">
        <h1>{{ store.restaurant.name }}</h1>

        <ul>
            <li v-for="food in store.foods" :key="food.id">
                {{ food.name }}
                <button @click="addToCart(food)">Add to cart</button>
            </li>
        </ul>
    </div>
</template>

<style lang="scss"></style>
