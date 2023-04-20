<script>
import { store } from "../store.js";
import axios from "axios";

export default {
    name: "Component2",
    components: {},
    data() {
        return {
            store,
            selectedTypes: [],
        };
    },
    methods: {
        getTypes() {
            axios.get(this.store.backEndLink + "/api/types").then((resp) => {
                // console.log(resp.data.types);
                this.store.types = resp.data.types;
                this.store.restaurants = resp.data.restaurants;
            });
        },

        // FILTRAGGIO TYPES
        toggleTypeSelection(typeName) {
            if (this.selectedTypes.includes(typeName)) {
                // remove type from selection
                this.selectedTypes = this.selectedTypes.filter(
                    (type) => type !== typeName
                );
            } else {
                // add type to selection
                this.selectedTypes.push(typeName);
            }
        },
    },
    created() {
        this.getTypes();
    },
    computed: {
        filteredRestaurants() {
            if (this.selectedTypes.length === 0) {
                // If no types are selected, return all restaurants
                return this.store.restaurants;
            } else {
                // Filter the restaurants by checking if they have at least one type that is included in the selectedTypes array
                return this.store.restaurants.filter((restaurant) => {
                    return restaurant.types.some((type) => {
                        return this.selectedTypes.includes(type.name);
                    });
                });
            }
        },
    },
};
</script>

<template>
    <main class="container">
        <section id="header" class="jumbotron text-center">
            <h1>
                <label for="exampleDataList" class="form-label"
                    >Cerca per categoria</label
                >
            </h1>
            <!-- <div class="d-flex justify-content-center">
                <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Cerca un ristorante...">
            </div> -->
        </section>

        <section class="py-4">
            <div class="container d-flex flex-column">
                <div class="d-flex">
                    <!-- LEFT SIDE -->
                    <div
                        id="TypesContainer"
                        class="d-flex flex-wrap bg-dark p-3"
                    >
                        <span
                            v-for="type in store.types"
                            :class="{
                                active: selectedTypes.includes(type.name),
                            }"
                            class="type-span"
                            @click="toggleTypeSelection(type.name)"
                            :key="type.id"
                        >
                            {{ type.name }}
                        </span>
                    </div>

                    <!-- RIGHT SIDE -->
                    <div class="bg-secondary flex-grow-1 ms-2 p-3">
                        <ul>
                            <li
                                v-for="restaurant in filteredRestaurants"
                                :key="restaurant.id"
                            >
                                <router-link
                                    class="text-decoration-none text-danger"
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
                </div>
            </div>
        </section>
    </main>
</template>

<style lang="scss" scoped>
main {
    border: 2px dashed black;
    background-color: lightgoldenrodyellow;

    .form-control {
        width: 450px;
        border-radius: 30px 30px;
    }

    #TypesContainer {
        width: 200px;
    }

    .type-span {
        display: inline-block;
        padding: 8px 16px;
        margin-right: 16px;
        margin-bottom: 16px;
        background-color: #f0f0f0;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
    }
    .active {
        background-color: red;
    }
}
</style>
