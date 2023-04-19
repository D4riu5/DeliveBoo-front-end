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
            type: null,
        };
    },
    methods: {
        getType() {
            axios
                .get(
                    this.store.backEndLink +
                        `/api/types/${this.$route.params.name}`
                )
                .then((resp) => {
                    // console.log(resp)
                    if (resp.data.type) {
                        this.type = resp.data.type;
                    } else {
                        // this.type = null;
                        // console.log(resp)
                        this.$router.push({ name: "not-found" });
                    }
                });
        },
    },
    created() {
        this.getType();
    },
};
</script>

<template>
    <div v-if="type && type.name">
        <h2>Lista ristoranti in categoria {{ type.name }}:</h2>

        <ul>
            <li v-for="restaurant in type.restaurants">
                <router-link
                    :to="{
                        name: 'restaurant-menu',
                        params: {
                            id: restaurant.id,
                        },
                    }"
                >
                    {{ restaurant.name }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss"></style>
