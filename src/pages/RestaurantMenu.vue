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
                this.store.cart.some(
                    (cartItem) => cartItem.restaurant_id !== item.restaurant_id
                )
            ) {
                alert("Puoi ordinare da un solo Ristorante alla volta! Svuota il carello per ordinare da un altro ristorante!");
                return;
            }

            this.store.cart.push(item);
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
