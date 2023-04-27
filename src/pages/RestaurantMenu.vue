<script>
// Helpers
import axios from "axios";
import { store } from "../store";

export default {
    name: "RestaurantMenu",
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
    <section>
        <div class="restaurant-header">
            <div class="flex-info-res my-container">
                <div class="restaurant-image">
                    <img :src="store.restaurant.image" :alt="store.restaurant.name">
                </div>

                <ul class="restaurant-infos">
                    <li class="restaurant-name">{{ store.restaurant.name }}</li>

                    <li class="info-restaurant">
                        <i class="fa-solid fa-location-dot"></i>{{ store.restaurant.address }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="food-cart" v-if="store.foods.length">
            <div class="my-container menu-wrapper">
                <div class="menu-list">
                    <div class="my-boxes-wrapper">
                        <div class="my-bigBox box-properties" v-for="food in store.foods" :key="food.id">
                            <div class="info-top">
                                <div class="my-bigBox-img">
                                    <img :src="food.image" :alt="food.name">
                                </div>

                                <div class="my-bigBox-info-wrapper">
                                    <div class="my-bigBox-info-name">{{ food.name }}</div>

                                    <div class="my-bigBox-info-OtherInfo">
                                        <div class="foodDescription">
                                            <em>{{ food.description }}</em>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="pay">
                                <div class="foodPrice" v-if="food">
                                    <span class="Pricebuble"> {{ food.price }}&euro;</span>
                                </div>

                                <button id="add" class="addToCart_btn" @click="addToCart(food)">
                                    <i class="fa-solid fa-cart-shopping"></i><span>Aggiungi al carrello</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="container" v-if="store.foods.length">
            <ul>
                <li v-for="food in store.foods" :key="food.id">
                    {{ food.name }}
                    <button @click="addToCart(food)">Add to cart</button>
                </li>
            </ul>
        </div> -->
    </section>
</template>

<style lang="scss" scoped>
    section {
        padding: 100px 0;
    }

    .my-container {
        display: flex;
        flex-wrap: wrap;

        button {
            padding: 50px 10px;
            border: none;
            border-radius: 10px;
            background-color: white;
            color: black;
            font-size: 18px;
        }
    }

    .restaurant-header {
        background-color: white;
        border: 1px solid rgba($color: #FC456A, $alpha: 0.7);
        border-top: none;
        box-shadow: 0px 5px 5px 0px rgba($color: #FC456A, $alpha: 0.7);
        margin-bottom: 50px;

        .flex-info-res {
            display: flex;
            align-items: center;
            padding: 20px 0;
        }

        .restaurant-image {
            width: 500px;
            border: 1px solid rgba($color: #FC456A, $alpha: 0.7);
            box-shadow: 0px 5px 5px 0px rgba($color: #FC456A, $alpha: 0.7);
            border-radius: 10px;

            img {
                display: block;
                border-radius: 10px;
            }
        }

        .restaurant-infos {
            padding-left: 50px;
            line-height: 30px;

            .restaurant-name {
                font-size: 40px;
                font-weight: 700;
                margin-bottom: 20px;
            }
        }
    }

    .food-cart {
        display: flex;
        justify-content: space-around;
        background-color: white;
        border: 1px solid rgba($color: #FC456A, $alpha: 0.7);
        box-shadow: 0px 5px 5px 0px rgba($color: #FC456A, $alpha: 0.7);

        .menu-wrapper {
            display: flex;
        }

        .menu-list {
            width: 70%;
            margin-right: 1%;

            .my-boxes-wrapper {
                display: flex;
                flex-wrap: wrap;
                margin-inline: -10px;

                .box-properties {
                    user-select: none;
                }
            }

            .my-bigBox {
                width: calc(100% / 3 - 20px);
                margin: 20px 10px;
                background-color: #fff;
                border: 1px solid rgba($color: #FC456A, $alpha: 0.7);
                box-shadow: 0px 10px 5px 0px rgba($color: #FC456A, $alpha: 0.7);
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                position: relative;
            }

            .info-top {
                flex-grow: 1;
            }

            .my-bigBox-img {
                width: 100%;
                object-fit: cover;
                background-color: white;
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;

                img {
                    display: block;
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                    border-top-right-radius: 10px;
                    border-top-left-radius: 10px;
                }
            }

            .my-bigBox-info-wrapper {
                padding: 10px;
                color: #5a5a5a;
                display: flex;
                flex-direction: column;

                .my-bigBox-info-name {
                    color: black;
                    font-size: 14px;
                    font-weight: bold;
                }

                .foodDescription {
                    color: #4a4a4a;
                    margin-bottom: 10px;
                }

                .my-bigBox-info-OtherInfo {
                    display: flex;
                    flex-direction: column;
                    font-size: 12px;
                }
            }

            .pay {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 50px 10px 10px 10px;

                .foodPrice {
                    font-size: 15px;
                }

                .addToCart_btn {
                    background-color: #FC456A;
                    border: 2px solid #FC456A;
                    color: #fff;
                    padding: 5px;
                    border-radius: 8px;

                    &:hover {
                        background-color: #fff;
                        border: 2px solid #FC456A;
                        color: #FC456A;
                    }
                }

                .fa-cart-shopping {
                    margin-right: 10px;
                }
            }
        }
    }
</style>
