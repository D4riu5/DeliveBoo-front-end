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
    <main>
        <!-- TITLE -->
        <section class="text-center">
            <h1 class="py-3">
                Cerca il tuo ristorante
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
                        class="d-flex flex-wrap rounded p-3"
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
                    <div class="my-container restaurants_box">
                        <div class="restaurantsContainer">
                            <div class="restaurantWrapper">
                                <div class="restaurant wrapperProperties" v-for="restaurant in filteredRestaurants" :key="restaurant.id">
                                    <router-link :to="{name: 'restaurant-menu', params: {id: restaurant.id}}">
                                        <div class="restaurant-img">
                                            <img :src="restaurant.image" :alt="restaurant.name">
                                        </div>

                                        <div class="restaurant-info">
                                            <div class="restaurant-info-name">
                                                <div class="name">
                                                    {{ restaurant.name }}
                                                </div>
                                            </div>

                                            <div class="restaurant-address">
                                                <i class="fa-solid fa-location-dot"></i>{{ restaurant.address }}
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <!-- <ul>
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
                        </ul> -->
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style lang="scss" scoped>
main {
    h1 {
        color: #FC456A;
    }

    .form-control {
        width: 450px;
        border-radius: 30px 30px;
    }

    #TypesContainer {
  width: 200px;
  max-height: 600px;
  overflow-y: auto;
  background-color: #ffffff;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba($color: #FC456A, $alpha: 0.8);
  }

  .type-span {
    display: block; /* Change from inline-block to block */
    width: 100%; /* Set width to 100% */
    padding: 15px 16px;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover, &.active {
      background-color: #f0f0f0;
      color: #FC456A;
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
            background-color: rgba($color: #FC456A, $alpha: 0.8);
        }

        .name {
            color: black;
            font-size: 18px;
        }

        .wrapperProperties {
            width: calc(100% / 4 - 20px);
            display: flex;
            margin: 15px 10px;
            user-select: none;
            border: 1px solid #FC456A;
            border-radius: 10px;
            box-shadow: 0px 5px 5px 0px #FC456A;

            &:hover {
                border-bottom: 5px solid #FC456A;
            }
        }
    }
}

.restaurantsContainer {
    flex-direction: row;
}

.restaurant {
    max-width: 270px;
    height: 230px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;

    .restaurant-img {
        height: 65%;
        overflow: hidden;
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
    }
}

@media only screen and (max-width: 1270px) {
    .my-container {
        width: 95%;
        margin: 0 auto;
    }

    .restaurant {
        min-width: 150px;
        height: 230px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        .restaurant-img {
            width: 200%;
        }
    }
}

@media only screen and (max-width: 1100px) {
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
        height: 180px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        .restaurant-info {
            .restaurant-info-name {
                .name {
                    font-size: 13px;
                    font-weight: 700;
                }
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
            width: 200%;
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
            width: 200%;
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
