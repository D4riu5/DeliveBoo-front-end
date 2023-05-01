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
            numVisibleRestaurants: 16,
            shippingCost: false,
        };
    },
    methods: {
        freeDelivery() {
            this.shippingCost = !this.shippingCost;
            console.log(this.shippingCost, 'shipping value')
        },
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
        // Load more restaurants
        loadMoreRestaurants() {
            this.numVisibleRestaurants += 16;
        },
        // Load more restaurants
        loadMoreRestaurants() {
            this.numVisibleRestaurants += 16;
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
                    return this.selectedTypes.every((typeName) => {
                        return restaurant.types.some((type) => {
                            return type.name === typeName;
                        });
                    });
                });
            }
        },

        // SET NUMBER OF RESTAURANTS VISIBLE ON PAGE
        visibleRestaurants() {
            return this.filteredRestaurants.slice(
                0,
                this.numVisibleRestaurants
            );
        },

        // SHOW BUTTON ONLY WHEN numVisRes < filtRes
        showLoadMoreButton() {
            return this.numVisibleRestaurants < this.filteredRestaurants.length;
        },
    },
};
</script>

<template>
    <main>
        <!-- TITLE -->
        <div id="look4Resta" class="restaurantBar text-center container-fluid">
            <p class="">Cerca il tuo ristorante</p>
        </div>

        <section class="py-5">
            <div class="container-xxl d-flex flex-column">
                <div class="d-flex">
                    <div id="TypesContainer" class="d-flex flex-wrap rounded p-3">
                        <div v-for="type in store.types" :class="{
                                active: selectedTypes.includes(type.name),
                            }" class="type-span" @click="toggleTypeSelection(type.name)" :key="type.id">
                            {{ type.name }}
                        </div>
                        <div class="type-span" @click="freeDelivery()">
                            Spedizione Gratuita
                        </div>
                    </div>

                    <!-- RIGHT SIDE -->
                    <div class="my-container restaurants_box">
                        <div class="restaurantsContainer" ref="restaurantsContainer">
                            <div class="restaurantWrapper">
                                <div class="restaurant wrapperProperties" v-for="restaurant in visibleRestaurants"
                                    :key="restaurant.id">
                                    <router-link :to="{
                                            name: 'restaurant-menu',
                                            params: { id: restaurant.id },
                                        }">
                                        <div class="restaurant-img position-relative">
                                            <img :src="restaurant.full_image_restaurant" :alt="restaurant.name" />
                                            <div
                                                class="price_badge position-absolute top-0 end-0 p-2 text-dark bg-warning rounded-bottom">
                                                <i class="fa-solid fa-truck-fast"></i>
                                                <strong class="ms-2">
                                                    {{
                                                        restaurant.prezzo_spedizione ==
                                                        0
                                                        ? "Gratis!"
                                                        : restaurant.prezzo_spedizione +
                                                        " €"
                                                    }}
                                                </strong>
                                            </div>
                                        </div>

                                        <div class="restaurant-info d-flex">
                                            <div class="restaurant-info-name">
                                                <div class="name">
                                                    {{ restaurant.name }}
                                                </div>
                                            </div>

                                            <div class="restaurant-address">
                                                <i class="fa-solid fa-location-dot"></i>{{ restaurant.address }}
                                            </div>

                                            <div class="category-badge d-flex flex-row flex-wrap">
                                                <div class="me-2" v-for="type in restaurant.types">
                                                    {{ type.name }}
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>

                                <!-- SHOW CUSTOM MESSAGE WHEN NO RESTAURANT IS FOUND -->
                                <div v-if="filteredRestaurants.length === 0" class="no-results">
                                    <h3 class="p-4">
                                        Ci dispiace, non abbiamo trovato nessun
                                        ristorante con le categorie selezionate.
                                    </h3>
                                </div>

                                <div v-if="showLoadMoreButton" class="d-flex justify-content-center w-100 m-3">
                                    <button class="btn btn-danger" @click="loadMoreRestaurants">
                                        Carica altri ristoranti
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style lang="scss" scoped>
main {
    margin-top: -15px;

    .restaurantBar {
        height: 80px;
        background: rgb(41, 41, 41);
        background: linear-gradient(0deg, rgba(41, 41, 41, 1) 0%, rgba(0, 0, 0, 0.5971638655462185) 15%, rgba(0, 0, 0, 0.5999649859943977) 85%, rgba(41, 41, 41, 1) 100%);

        p {
            margin-top: 8px;
            padding-top: 12px;
            font-size: 35px;
            color: #ff3f5c;
            font-family: 'Comfortaa', cursive;
            vertical-align: middle;
        }
    }

    .form-control {
        width: 450px;
        border-radius: 30px 30px;
    }

    #TypesContainer {
        width: 200px;
        max-height: 600px;
        overflow-y: auto;
        width: 200px;
        max-height: 600px;

        &::-webkit-scrollbar {
            width: 8px;
        }

        &::-webkit-scrollbar {
            width: 8px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba($color: #fc456a, $alpha: 0.8);
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba($color: #fc456a, $alpha: 0.8);
        }

        .type-span {
            display: block;
            width: 100%;
            border: 1.5px solid #fc456a;
            border-radius: 4px;
            font-size: 15px;
            /* font-weight: 200; */
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
            background: rgb(16, 4, 7);
            background: linear-gradient(0deg, rgb(16, 4, 7) 0%, rgb(26, 14, 17) 94%, rgb(255, 255, 255) 100%);
            color: white;
            text-align: center;
            margin: -15px 2px;
            padding: 12px 20px;
            border-radius: 52%;

            &:hover,
            &.active {
                background-color: #f0f0f0;
                color: #fc456a;
            }
        }
    }

    .active {
        background-color: red;
    }
}

.restaurants_box {
    .restaurantWrapper {
        display: flex;
        flex-wrap: wrap;
        margin-left: 25px;
        padding-right: 15px;
        height: 600px;
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 8px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba($color: #fc456a, $alpha: 0.8);
        }

        .name {
            color: black;
            font-size: 18px;
        }

        .wrapperProperties {
            width: calc(100% / 4 - 20px);
            background-color: white;
            display: flex;
            margin: 15px 10px;
            user-select: none;
            border: 1px solid #fc456a;
            border-radius: 10px;
            box-shadow: 0px 5px 5px 0px #fc456a;

            &:hover {
                border-bottom: 5px solid #fc456a;
            }
        }
    }
}

.restaurantsContainer {
    flex-direction: row;
}

.restaurant {
    max-width: 270px;
    height: 260px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;

    .restaurant-img {
        height: 65%;
        overflow: hidden;

        .price_badge {
            font-size: 12px;
        }
    }

    .restaurant-info {
        width: 100%;
        height: 35%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .restaurant-info-name {
            font-size: 14px;
            font-weight: 600;
        }

        .restaurant-address {
            display: flex;
            align-items: center;
            color: #898a8a;
            font-size: 12px;

            .fa-location-dot {
                margin-right: 5px;
            }
        }

        .category-badge {
            // background-color: #f0f0f0;
            color: #fc456a;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 600;
            margin-right: 5px;
            margin-bottom: 5px;
        }
    }
}

@media only screen and (max-width: 1270px) {
    .my-container {
        width: 95%;
        margin: 0 auto;
    }

    .restaurant {
        min-width: 210px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        .restaurant-img {
            width: 100%;
        }
    }

    .restaurant-info {
        .restaurant-info-name {
            .name {
                font-size: 13px;
            }
        }

        .restaurant-address {
            font-size: 12px;
        }
    }
}

@media only screen and (max-width: 1100px) {
    .restaurant {
        min-width: 210px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        .restaurant-img {
            width: 100%;

            .price_badge {
                font-size: 14px;
            }
        }
    }

    .restaurant-info {
        .restaurant-info-name {
            .name {
                font-size: 13px;
            }
        }

        .restaurant-address {
            font-size: 12px;
        }
    }
}

@media only screen and (max-width: 900px) {
    .restaurant {
        min-width: 210px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        .restaurant-img {
            width: 100%;

            .price_badge {
                font-size: 16px;
            }
        }
    }
}

@media only screen and (max-width: 812px) {
    .restaurant {
        min-width: 210px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        .restaurant-img {
            width: 100%;
        }
    }
}

@media only screen and (max-width: 750px) {
    .restaurant {
        min-width: 45%;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        .restaurant-img {
            width: 100%;
        }
    }
}

@media only screen and (max-width: 770px) {
    .restaurant {
        min-width: 90%;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        .restaurant-img {
            width: 100%;
        }
    }
}

@media only screen and (max-width: 470px) {
    .restaurantWrapper {
        height: 625px;
    }

    .my-container {
        margin-inline: 0;
        width: 100%;
    }

    .restaurants_box {
        .restaurantWrapper {
            display: flex;
            flex-wrap: wrap;
            margin-left: 0px;
            height: 600px;
            overflow-y: auto;
            justify-content: center;
        }
    }
}

@media only screen and (max-width: 469px) {
    .restaurantsContainer {
        padding-top: 30px;
    }
}
</style>
