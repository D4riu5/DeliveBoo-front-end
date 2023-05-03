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
            console.log(this.shippingCost, "shipping value");
        },
        getTypes() {
            axios.get(this.store.backEndLink + "/api/types").then((resp) => {
                // console.log(resp.data.types);
                this.store.types = resp.data.types;
                this.store.restaurants = resp.data.restaurants;

                // Save restaurants data to local storage
                localStorage.setItem(
                    "restaurants",
                    JSON.stringify(resp.data.restaurants)
                );
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
    <main class="py-3">
        <!-- TITLE -->
        <div id="look4Resta" class="restaurantBar text-center container-fluid">
            <p class="">Cerca il tuo ristorante</p>
        </div>
        <!-- Left side -->
        <section class="pt-1 pb-1">
            <div class="container-xxl d-flex flex-column">
                <div class="d-flex">
                    <div id="TypesContainer" class="d-flex flex-wrap rounded p-3">
                        <div class="type-span" @click="freeDelivery()">
                            Sped. Gratuita
                        </div>
                        <div v-bind:class="my - button" v-for="type in store.types" :class="{
                                active: selectedTypes.includes(type.name),
                            }" class="type-span" @click="toggleTypeSelection(type.name)" :key="type.id">
                            {{ type.name }}
                        </div>

                    </div>
                    <!-- / Left side -->


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
                                            <img :src="restaurant.full_image_restaurant
                                                " :alt="restaurant.name" />
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
        border-top: 1px solid lightgray;

        p {
            margin-top: 8px;
            padding-top: 12px;
            font-size: 45px;
            color: black;
            font-family: "Comfortaa", cursive;
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
            background-color: rgba($color: #000000, $alpha: 0.8);
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba($color: #000000, $alpha: 0.8);
        }


        .type-span {
            --color: #e43659;
            display: block;
            width: 8em;
            height: 2.6em;
            border: 2px solid black;
            border-radius: 6px;
            font-size: 17px;
            cursor: pointer;
            transition: color .5s;
            margin: 5px;
            position: relative;
            overflow: hidden;
            z-index: 1;
            line-height: 2.5em;
            padding-left: 8px;
            font-weight: bold;
            color: var(--color);

            &:before {
                content: "";
                position: absolute;
                z-index: -1;
                background: var(--color);
                height: 150px;
                width: 200px;
                border-radius: 50%;
                color: white;

            }

            &:hover {
                color: #fff;
            }

            &:before {
                top: 100%;
                left: 100%;
                transition: all .7s;
            }

            &:hover:before {
                top: -30px;
                left: -30px;
            }

            &:active:before {
                background: var(--color);
                transition: background 0s;
            }
        }
    }

    .active {
        background-color: #e43659;
        color: white !important;
    }
}

.restaurants_box {
    .restaurantWrapper {
        display: flex;
        flex-wrap: wrap;
        height: 610px;
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 8px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba($color: #000000, $alpha: 0.8);
        }

        .name {
            color: black;
            font-size: 18px;
        }

        .wrapperProperties {
            width: calc(100% / 4 - 20px);
            background-color: white;
            display: flex;
            margin-right: 6px;
            margin-left: 8px;
            margin-top: 3px;
            margin-bottom: 3px;
            user-select: none;
            border: 1px solid #000000;
            border-radius: 10px;
            box-shadow: 0px 5px 5px 0px #000000;

            img {
                object-fit: cover;
                width: 140%;
                height: 126%;
            }

            &:hover {
                border-bottom: 5px solid #000000;
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

@media screen and (max-width: 320px) {
    main {
        margin-top: -15px;

        .restaurantBar {
            border-top: 1px solid lightgray;

            p {
                margin-top: 8px;
                padding-top: 12px;
                font-size: 25px;
                color: black;
                font-family: "Comfortaa", cursive;
                vertical-align: middle;
            }
        }

        .form-control {
            width: 450px;
            border-radius: 30px 30px;
        }

        #TypesContainer {
            overflow-y: auto;
            width: 200px;
            height: 600px;

            &::-webkit-scrollbar {
                width: 2px;
            }

            &::-webkit-scrollbar {
                width: 2px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }


            .type-span {
                --color: #e43659;
                display: block;
                width: 100px;
                height: 2.5em;
                border: 0.5px solid black;
                border-radius: 6px;
                font-size: 12px;
                cursor: pointer;
                transition: color .5s;
                margin: 0px;
                position: relative;
                overflow: hidden;
                z-index: 1;
                line-height: 2.5em;
                padding-left: 2.5px;
                font-weight: bold;
                color: var(--color);

                &:before {
                    content: "";
                    position: absolute;
                    z-index: -1;
                    height: 150px;
                    width: 200px;
                    border-radius: 50%;
                    color: white;

                }

                &:hover {
                    color: #fff;
                }

                &:before {
                    top: 100%;
                    left: 100%;
                    transition: all .7s;
                }

                &:hover:before {
                    top: -30px;
                    left: -30px;
                }

                &:active:before {
                    background: #e43659;
                    transition: background 0s;
                }
            }
        }

        .active {
            background-color: #e43659;
            color: white !important;
        }
    }

    .restaurants_box {
        .restaurantWrapper {
            display: flex;
            flex-wrap: swrap;
            padding-top: 5%;
            height: 576px;
            width: 90%;
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 8px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }

            .name {
                color: black;
                font-size: 11px;
            }

            .wrapperProperties {
                width: calc(100% / 1);
                background-color: white;
                display: flex;
                user-select: none;
                border: 0.5px solid #000000;
                border-radius: 10px;
                box-shadow: 0px 2px 2px 0px #000000;
                

                img {
                    object-fit: cover;
                    width: 200%;
                    height: 100%;
                }

                &:hover {
                    border-bottom: 5px solid #000000;
                }
            }
        }
    }

    .restaurantsContainer {
        width: 114%;
        margin-left: -24px;
        flex-direction: row;
    }

    .restaurant {
        max-width: 280px;
        height: 260px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        .restaurant-img {
            height: 65%;
            overflow: hidden;

            .price_badge {
                font-size: 10px;
                position: absolute;
                top: 0;
                left: 0;
                width: 65px;
            }
        }

        .restaurant-info {
            width: 100%;
            height: 35%;
            font-size: 1px;
            padding: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .restaurant-info-name {
                font-size: 10px;
                font-weight: 600;
                justify-content: flex-start;
            }

            .restaurant-address {
                display: flex;
                align-items: center;
                color: #898a8a;
                font-size: 9px;

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
}

@media screen and (min-width: 321px) and (max-width: 376px) {
    main {
        margin-top: -15px;

        .restaurantBar {
            border-top: 1px solid lightgray;

            p {
                margin-top: 8px;
                padding-top: 12px;
                font-size: 25px;
                color: black;
                font-family: "Comfortaa", cursive;
                vertical-align: middle;
            }
        }

        .form-control {
            width: 450px;
            border-radius: 30px 30px;
        }

        #TypesContainer {
            overflow-y: auto;
            width: 200px;
            height: 600px;

            &::-webkit-scrollbar {
                width: 2px;
            }

            &::-webkit-scrollbar {
                width: 2px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }


            .type-span {
                --color: #e43659;
                display: block;
                width: 100px;
                height: 2.5em;
                border: 0.5px solid black;
                border-radius: 6px;
                font-size: 13px;
                cursor: pointer;
                transition: color .5s;
                margin: 0px;
                position: relative;
                overflow: hidden;
                z-index: 1;
                line-height: 2.5em;
                padding-left: 2.5px;
                font-weight: bold;
                color: var(--color);

                &:before {
                    content: "";
                    position: absolute;
                    z-index: -1;
                    height: 150px;
                    width: 200px;
                    border-radius: 50%;
                    color: white;

                }

                &:hover {
                    color: #fff;
                }

                &:before {
                    top: 100%;
                    left: 100%;
                    transition: all .7s;
                }

                &:hover:before {
                    top: -30px;
                    left: -30px;
                }

                &:active:before {
                    background: #e43659;
                    transition: background 0s;
                }
            }
        }

        .active {
            background-color: #e43659;
            color: white !important;
        }
    }

    .restaurants_box {
        .restaurantWrapper {
            display: flex;
            flex-wrap: swrap;
            padding-top: 5%;
            height: 576px;
            width: 90%;
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 8px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }

            .name {
                color: black;
                font-size: 14px;
            }

            .wrapperProperties {
                width: calc(100% / 1);
                background-color: white;
                display: flex;
                user-select: none;
                border: 0.5px solid #000000;
                border-radius: 10px;
                box-shadow: 0px 2px 2px 0px #000000;

                img {
                    object-fit: cover;
                    width: 120%;
                    height: 109%;
                    padding-bottom: 3px;
                }

                &:hover {
                    border-bottom: 5px solid #000000;
                }
            }
        }
    }

    .restaurantsContainer {
        width: 117%;
        margin-left: -24px;
        flex-direction: row;
    }

    .restaurant {
        max-width: 280px;
        height: 260px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        .restaurant-img {
            height: 65%;
            overflow: hidden;

            .price_badge {
                font-size: 10px;
                position: absolute;
                top: 0;
                left: 0;
                width: 74px;
            }
        }

        .restaurant-info {
            width: 100%;
            height: 35%;
            font-size: 1px;
            padding: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;


            .restaurant-info-name {
                font-size: 14px;
                font-weight: 600;
                justify-content: flex-start;
            }

            .restaurant-address {
                display: flex;
                align-items: center;
                color: #898a8a;
                font-size: 9px;

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
}

@media screen and (min-width: 376px) and (max-width: 426px) {
    main {
        margin-top: -15px;

        .restaurantBar {
            border-top: 1px solid lightgray;

            p {
                margin-top: 8px;
                padding-top: 12px;
                font-size: 25px;
                color: black;
                font-family: "Comfortaa", cursive;
                vertical-align: middle;
            }
        }

        .form-control {
            width: 450px;
            border-radius: 30px 30px;
        }

        #TypesContainer {
            overflow-y: auto;
            width: 200px;
            height: 600px;

            &::-webkit-scrollbar {
                width: 2px;
            }

            &::-webkit-scrollbar {
                width: 2px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }


            .type-span {
                --color: #e43659;
                display: block;
                width: 112px;
                height: 2.3em;
                border: 0.5px solid black;
                border-radius: 6px;
                font-size: 15px;
                cursor: pointer;
                transition: color .5s;
                margin: 0px 0px 0px 0px;
                position: relative;
                overflow: hidden;
                z-index: 1;
                line-height: 2.5em;
                padding-left: 2.5px;
                font-weight: bold;
                color: var(--color);

                &:before {
                    content: "";
                    position: absolute;
                    z-index: -1;
                    height: 150px;
                    width: 200px;
                    border-radius: 50%;
                    color: white;

                }

                &:hover {
                    color: #fff;
                }

                &:before {
                    top: 100%;
                    left: 100%;
                    transition: all .7s;
                }

                &:hover:before {
                    top: -30px;
                    left: -30px;
                }

                &:active:before {
                    background: #e43659;
                    transition: background 0s;
                }
            }
        }

        .active {
            background-color: #e43659;
            color: white !important;
        }
    }

    .restaurants_box {
        .restaurantWrapper {
            display: flex;
            flex-wrap: swrap;
            padding-top: 5%;
            height: 576px;
            width: 90%;
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 8px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }

            .name {
                color: black;
                font-size: 15px;

            }

            .wrapperProperties {
                width: calc(100% / 1);
                background-color: white;
                display: flex;
                user-select: none;
                border: 0.5px solid #000000;
                border-radius: 10px;
                box-shadow: 0px 2px 2px 0px #000000;

                img {
                    object-fit: cover;
                    width: 100%;
                    height: 109%;
                    padding-bottom: 3px;
                }

                &:hover {
                    border-bottom: 5px solid #000000;
                }
            }
        }
    }

    .restaurantsContainer {
        width: 114%;
        margin-left: -24px;
        flex-direction: row;
    }

    .restaurant {
        max-width: 280px;
        height: 260px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        .restaurant-img {
            height: 65%;
            overflow: hidden;

            .price_badge {
                font-size: 12px;
                position: absolute;
                top: 0;
                left: 0;
                width: 84px;
            }
        }

        .restaurant-info {
            width: 100%;
            height: 35%;
            font-size: 1px;
            padding: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;


            .restaurant-info-name {
                font-size: 14px;
                font-weight: 600;
                justify-content: flex-start;
            }

            .restaurant-address {
                display: flex;
                align-items: center;
                color: #898a8a;
                font-size: 9px;

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
}

@media screen and (min-width: 426px) and (max-width: 600px) {
    main {
        margin-top: -15px;

        .restaurantBar {
            border-top: 1px solid lightgray;

            p {
                margin-top: 8px;
                padding-top: 12px;
                font-size: 25px;
                color: black;
                font-family: "Comfortaa", cursive;
                vertical-align: middle;
            }
        }

        .form-control {
            width: 450px;
            border-radius: 30px 30px;
        }

        #TypesContainer {
            overflow-y: auto;
            width: 180px;
            height: 600px;

            &::-webkit-scrollbar {
                width: 2px;
            }

            &::-webkit-scrollbar {
                width: 2px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }


            .type-span {
                --color: #e43659;
                display: block;
                width: 137px;
                height: 2.3em;
                border: 0.5px solid black;
                border-radius: 6px;
                font-size: 15px;
                cursor: pointer;
                transition: color .5s;
                margin: 0px 0px 0px 0px;
                position: relative;
                overflow: hidden;
                z-index: 1;
                line-height: 2.5em;
                padding-left: 2.5px;
                font-weight: bold;
                color: var(--color);
                text-align: center;

                &:before {
                    content: "";
                    position: absolute;
                    z-index: -1;
                    height: 150px;
                    width: 200px;
                    border-radius: 50%;
                    color: white;

                }

                &:hover {
                    color: #fff;
                }

                &:before {
                    top: 100%;
                    left: 100%;
                    transition: all .7s;
                }

                &:hover:before {
                    top: -30px;
                    left: -30px;
                }

                &:active:before {
                    background: #e43659;
                    transition: background 0s;
                }
            }
        }

        .active {
            background-color: #e43659;
            color: white !important;
        }
    }

    .restaurants_box {
        .restaurantWrapper {
            display: flex;
            flex-wrap: swrap;
            padding-top: 5%;
            height: 576px;
            width: 90%;
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 8px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }

            .name {
                color: rgb(0, 0, 0);
                font-size: 16px;
                text-align: start;
            }

            .wrapperProperties {
                width: calc(100% / 1);
                background-color: white;
                display: flex;
                user-select: none;
                border: 0.5px solid #000000;
                border-radius: 10px;
                box-shadow: 0px 2px 2px 0px #000000;

                img {
                    object-fit: cover;
                    width: 100%;
                    height: 105%;
                    padding-bottom: 3px;
                }

                &:hover {
                    border-bottom: 5px solid #000000;
                }
            }
        }
    }

    .restaurantsContainer {
        width: 96%;
        margin-left: 5px;
    }

    .restaurant {
        max-width: 334px;
        height: 260px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        .restaurant-img {
            height: 64%;
            overflow: hidden;
            width: 147%;

            .price_badge {
                font-size: 12px;
                position: absolute;
                top: 0;
                left: 0;
                width: 84px;
            }
        }

        .restaurant-info {
            width: 100%;
            height: 35%;
            font-size: 1px;
            padding: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;


            .restaurant-info-name {
                font-size: 14px;
                font-weight: 600;
                justify-content: flex-start;
            }

            .restaurant-address {
                display: flex;
                align-items: center;
                color: #898a8a;
                font-size: 13px;

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
}

@media screen and (min-width: 601px) and (max-width: 768px) {
    main {
        margin-top: -15px;

        .restaurantBar {
            border-top: 1px solid lightgray;

            p {
                margin-top: 8px;
                padding-top: 12px;
                font-size: 25px;
                color: black;
                font-family: "Comfortaa", cursive;
                vertical-align: middle;
            }
        }

        .form-control {
            width: 450px;
            border-radius: 30px 30px;
        }

        #TypesContainer {
            overflow-y: auto;
            width: 200px;
            height: 600px;

            &::-webkit-scrollbar {
                width: 2px;
            }

            &::-webkit-scrollbar {
                width: 2px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }


            .type-span {
                --color: #e43659;
                display: block;
                width: 154px;
                height: 2.3em;
                border: 0.5px solid black;
                border-radius: 6px;
                font-size: 15px;
                cursor: pointer;
                transition: color .5s;
                margin: 0px 0px 0px 0px;
                position: relative;
                overflow: hidden;
                z-index: 1;
                line-height: 2.5em;
                padding-left: 2.5px;
                font-weight: bold;
                color: var(--color);
                text-align: center;

                &:before {
                    content: "";
                    position: absolute;
                    z-index: -1;
                    height: 150px;
                    width: 200px;
                    border-radius: 50%;
                    color: white;

                }

                &:hover {
                    color: #fff;
                }

                &:before {
                    top: 100%;
                    left: 100%;
                    transition: all .7s;
                }

                &:hover:before {
                    top: -30px;
                    left: -30px;
                }

                &:active:before {
                    background: #e43659;
                    transition: background 0s;
                }
            }
        }

        .active {
            background-color: #e43659;
            color: white !important;
        }
    }

    .restaurants_box {
        .restaurantWrapper {
            display: flex;
            flex-wrap: swrap;
            padding-top: 5%;
            height: 565px;
            width: 90%;
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 8px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }

            .name {
                color: rgb(0, 0, 0);
                font-size: 16px;
                text-align: start;
            }

            .wrapperProperties {
                width: calc(100% / 1);
                background-color: white;
                display: flex;
                user-select: none;
                border: 0.5px solid #000000;
                border-radius: 10px;
                box-shadow: 0px 2px 2px 0px #000000;

                img {
                    object-fit: cover;
                    width: 75%;
                    height: 151%;
                    padding-bottom: 3px;
                }

                &:hover {
                    border-bottom: 5px solid #000000;
                }
            }
        }
    }

    .restaurantsContainer {
        width: 100%;
        margin-left: 5px;
        flex-direction: row;
    }

    .restaurant {
        max-width: 534px;
        height: 260px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        .restaurant-img {
            height: 64%;
            overflow: hidden;
            width: 220%;

            .price_badge {
                font-size: 15px;
                position: absolute;
                top: 0;
                left: 0;
                width: 94px;
            }
        }

        .restaurant-info {
            width: 100%;
            height: 35%;
            font-size: 1px;
            padding: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;


            .restaurant-info-name {
                font-size: 14px;
                font-weight: 600;
                justify-content: flex-start;
            }

            .restaurant-address {
                display: flex;
                align-items: center;
                color: #898a8a;
                font-size: 13px;

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
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
    main {
        margin-top: -15px;

        .restaurantBar {
            border-top: 1px solid lightgray;

            p {
                margin-top: 8px;
                padding-top: 12px;
                font-size: 45px;
                color: black;
                font-family: "Comfortaa", cursive;
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
                background-color: rgba($color: #000000, $alpha: 0.8);
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }


            .type-span {
                --color: #e43659;
                display: block;
                width: 8em;
                height: 2.6em;
                border: 2px solid black;
                border-radius: 6px;
                font-size: 17px;
                cursor: pointer;
                transition: color .5s;
                margin: 5px;
                position: relative;
                overflow: hidden;
                z-index: 1;
                line-height: 2.5em;
                padding-left: 8px;
                font-weight: bold;
                color: var(--color);

                &:before {
                    content: "";
                    position: absolute;
                    z-index: -1;
                    background: var(--color);
                    height: 150px;
                    width: 200px;
                    border-radius: 50%;
                    color: white;

                }

                &:hover {
                    color: #fff;
                }

                &:before {
                    top: 100%;
                    left: 100%;
                    transition: all .7s;
                }

                &:hover:before {
                    top: -30px;
                    left: -30px;
                }

                &:active:before {
                    background: var(--color);
                    transition: background 0s;
                }
            }
        }

        .active {
            background-color: #e43659;
            color: white !important;
        }
    }

    .restaurants_box {
        .restaurantWrapper {
            display: flex;
            flex-wrap: wrap;
            height: 610px;
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 8px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }

            .name {
                color: black;
                font-size: 14px;
            }

            .wrapperProperties {
                width: calc(100% / 3 - 20px);
                background-color: white;
                display: flex;
                user-select: none;
                border: 1px solid #000000;
                border-radius: 10px;
                box-shadow: 0px 5px 5px 0px #000000;
                margin-right: 6px;
                margin-left: 8px;
                margin-top: 3px;
                margin-bottom: 3px;

                img {
                    object-fit: cover;
                    width: 150%;
                    height: 105%;
                }

                &:hover {
                    border-bottom: 5px solid #000000;
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
                font-size: 13px;
                position: absolute;
                top: 0;
                left: 0;
                width: 84px;
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
                font-size: 12px;
                font-weight: 600;
            }

            .restaurant-address {
                display: flex;
                align-items: center;
                color: #898a8a;
                font-size: 11px;

                .fa-location-dot {
                    margin-right: 5px;
                }
            }

            .category-badge {
                // background-color: #f0f0f0;
                color: #fc456a;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 600;
                margin-right: 5px;
                margin-bottom: 5px;
            }
        }
    }

}


@media screen and (min-width: 1024px) and (max-width: 1440px) {
    main {
        margin-top: -15px;

        .restaurantBar {
            border-top: 1px solid lightgray;

            p {
                margin-top: 8px;
                padding-top: 12px;
                font-size: 45px;
                color: black;
                font-family: "Comfortaa", cursive;
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
                background-color: rgba($color: #000000, $alpha: 0.8);
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }


            .type-span {
                --color: #e43659;
                display: block;
                width: 8em;
                height: 2.6em;
                border: 2px solid black;
                border-radius: 6px;
                font-size: 17px;
                cursor: pointer;
                transition: color .5s;
                margin: 5px;
                position: relative;
                overflow: hidden;
                z-index: 1;
                line-height: 2.5em;
                padding-left: 8px;
                font-weight: bold;
                color: var(--color);

                &:before {
                    content: "";
                    position: absolute;
                    z-index: -1;
                    background: var(--color);
                    height: 150px;
                    width: 200px;
                    border-radius: 50%;
                    color: white;

                }

                &:hover {
                    color: #fff;
                }

                &:before {
                    top: 100%;
                    left: 100%;
                    transition: all .7s;
                }

                &:hover:before {
                    top: -30px;
                    left: -30px;
                }

                &:active:before {
                    background: var(--color);
                    transition: background 0s;
                }
            }
        }

        .active {
            background-color: #e43659;
            color: white !important;
        }
    }

    .restaurants_box {
        .restaurantWrapper {
            display: flex;
            flex-wrap: wrap;
            height: 610px;
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 8px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #000000, $alpha: 0.8);
            }

            .name {
                color: black;
                font-size: 18px;
            }

            .wrapperProperties {
                width: calc(100% / 3 - 20px);
                background-color: white;
                display: flex;
                user-select: none;
                border: 1px solid #000000;
                border-radius: 10px;
                box-shadow: 0px 5px 5px 0px #000000;

                img {
                    object-fit: cover;
                    width: 150%;
                    height: 105%;
                }

                &:hover {
                    border-bottom: 5px solid #000000;
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
                font-size: 15px;
                position: absolute;
                top: 0;
                left: 0;
                width: 94px;
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

}
</style>
