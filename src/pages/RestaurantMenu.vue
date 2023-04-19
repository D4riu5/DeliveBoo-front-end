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
            foods: [],
            restaurant: {},
        };
    },
    methods: {
        getFoods() {
            axios
                .get(
                    this.store.backEndLink +
                        `/api/restaurants/${this.$route.params.id}/foods`
                )
                .then((resp) => {
                    if (resp.data.restaurant && resp.data.foods) {
                        this.restaurant = resp.data.restaurant;
                        this.foods = resp.data.foods;
                    } else {
                        this.$router.push({ name: "not-found" });
                    }
                    
                });
        },
    },
    created() {
        this.getFoods()
    },
};
</script>

<template>
<div v-if="foods.length">
    <h1>{{ restaurant.name }}</h1>

    <ul>
      <li v-for="food in foods" :key="food.id">{{ food.name }}</li>
    </ul>
  </div></template>

<style lang="scss"></style>
