<script>
// Helpers
import { store } from "./../store";
import axios from "axios";

export default {
    name: "success",
    data() {
        return {
            store,
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

        getFilteredRestaurants(type) {
            return this.store.restaurants.filter((restaurant) => {
                for (let i = 0; i < restaurant.types.length; i++) {
                    if (restaurant.types[i].id === type.id) {
                        return true;
                    }
                }
                return false;
            });
        },
    },
    created() {
        this.getTypes();
    },
};
</script>

<template>
    <div v-if="store.types.length > 0" class="">
        <swiper-container
            style="
                --swiper-navigation-color: red;
                --swiper-pagination-color: red;
            "
            noSwipingClass="swiper-slide"
            thumbs-swiper=".mySwiper2"
            loop="true"
            space-between="10"
            navigation="true"
        >
            <swiper-slide
                v-for="(type, index) in store.types"
                :key="type.id"
                class="type_slide_big pt-2 px-5 py-xl-5"
            >
                <div class="d-flex flex-row justify-content-center">
                    <div class="ps-5 w-50">
                        <h1>Cucina {{ type.name }}</h1>
                        <h5>{{ type.description }}</h5>
                    </div>
                    <div class="w-50">
                        <h3 class="text-center mb-3">
                            Sfoglia i nostri ristoranti:
                        </h3>
                        <div class="d-flex justify-content-center flex-column align-items-center">
                            <div class="">
                                <swiper-container :effect="'cards'" :grabCursor="true" nested="true" class="card-container">
                                     <swiper-slide v-for="restaurant in getFilteredRestaurants(type)" class="slide-mini rounded">

                                        <div class="restaurant wrapperProperties">
                                            <div class="restaurant-img position-relative">
                                                <img :src="restaurant.full_image_restaurant" :alt="restaurant.name"/>
                                                <div class="price_badge position-absolute top-0 end-0 p-2 text-dark bg-warning rounded-bottom">
                                                    <i class="fa-solid fa-truck-fast"></i>
                                                    <strong class="ms-2">
                                                        {{ restaurant.prezzo_spedizione ==0? "Gratis!" : restaurant.prezzo_spedizione +" €" }}
                                                    </strong>
                                                </div>
                                            </div>
                                            
                                            <div class="restaurant-info d-flex pb-4">
                                                <div class="restaurant-info-name">
                                                    <div class="name text-dark">
                                                        {{ restaurant.name }}
                                                    </div>
                                                </div>

                                                <div class="restaurant-address">
                                                    <i class="fa-solid fa-location-dot"></i>
                                                    {{ restaurant.address }}
                                                </div>

                                                <div class="category-badge d-flex flex-row flex-wrap">
                                                    <div class="me-2" v-for="(type, index) in restaurant.types">
                                                        {{ type.name }}
                                                    </div>
                                                </div>

                                                <div>
                                                    <router-link class="" :to="{name: 'restaurant-menu', params: { id: restaurant.id }, }">
                                                        Ordina ora!
                                                    </router-link>
                                                </div>
                                            </div>
                                        </div>

                                        
                                    </swiper-slide>
                                </swiper-container>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper-container>

        <swiper-container
            class="mySwiper2"
            loop="true"
            space-between="10"
            slides-per-view="4"
            watch-slides-progress="true"
        >
            <swiper-slide
                v-for="(type, index) in store.types"
                :key="type.id"
                :style="{ 'background-image': `url(${type.full_image_path})` }"
                class="type_slide_small"
            >
                <h4 class="p-2 rounded">
                    {{ type.name }}
                </h4>
            </swiper-slide>
        </swiper-container>
    </div>
</template>

<style lang="scss">
.slide-mini {
    background-color: rgb(255, 255, 255);
    border: 1px solid black;
}

.type_slide_big {
    background-color: #ffffff;
    color: rgb(0, 0, 0);
}

.swiper-slide-thumb-active {
    opacity: 1 !important;
    filter: contrast(110%);
}
.mySwiper2 .swiper-slide {
    width: 100%;
    height: 150px;
    opacity: 0.5;
    cursor: pointer;
}

.type_slide_small {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    padding-top: 22px;
    h4 {
        color: rgb(255, 255, 255);
        background-color: rgba(0, 0, 0, 0.736);
    }
}


// RESTAURANT
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

.card-container {
      width: 260px;
      height: auto;
    }

// @media only screen and (max-width: 1270px) {
//     .my-container {
//         width: 95%;
//         margin: 0 auto;
//     }

//     .restaurant {
//         min-width: 210px;
//         border-radius: 5px;
//         overflow: hidden;
//         position: relative;

//         .restaurant-img {
//             width: 100%;
//         }
//     }

//     .restaurant-info {
//         .restaurant-info-name {
//             .name {
//                 font-size: 13px;
//             }
//         }

//         .restaurant-address {
//             font-size: 12px;
//         }
//     }
// }

// @media only screen and (max-width: 1100px) {
//     .restaurant {
//         min-width: 210px;
//         border-radius: 5px;
//         overflow: hidden;
//         position: relative;

//         .restaurant-img {
//             width: 100%;

//             .price_badge {
//                 font-size: 14px;
//             }
//         }
//     }

//     .restaurant-info {
//         .restaurant-info-name {
//             .name {
//                 font-size: 13px;
//             }
//         }

//         .restaurant-address {
//             font-size: 12px;
//         }
//     }
// }

// @media only screen and (max-width: 900px) {
//     .restaurant {
//         min-width: 210px;
//         border-radius: 5px;
//         overflow: hidden;
//         position: relative;

//         .restaurant-img {
//             width: 100%;

//             .price_badge {
//                 font-size: 16px;
//             }
//         }
//     }
// }

// @media only screen and (max-width: 812px) {
//     .restaurant {
//         min-width: 210px;
//         border-radius: 5px;
//         overflow: hidden;
//         position: relative;

//         .restaurant-img {
//             width: 100%;
//         }
//     }
// }

// @media only screen and (max-width: 750px) {
//     .restaurant {
//         min-width: 45%;
//         border-radius: 5px;
//         overflow: hidden;
//         position: relative;

//         .restaurant-img {
//             width: 100%;
//         }
//     }
// }

// @media only screen and (max-width: 770px) {
//     .restaurant {
//         min-width: 90%;
//         border-radius: 5px;
//         overflow: hidden;
//         position: relative;

//         .restaurant-img {
//             width: 100%;
//         }
//     }
// }

// @media only screen and (max-width: 470px) {
//     .restaurantWrapper {
//         height: 625px;
//     }

//     .my-container {
//         margin-inline: 0;
//         width: 100%;
//     }

//     .restaurants_box {
//         .restaurantWrapper {
//             display: flex;
//             flex-wrap: wrap;
//             margin-left: 0px;
//             height: 600px;
//             overflow-y: auto;
//             justify-content: center;
//         }
//     }
// }

// @media only screen and (max-width: 469px) {
//     .restaurantsContainer {
//         padding-top: 30px;
//     }
// }
</style>
