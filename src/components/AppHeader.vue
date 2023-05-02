<script>
import { router } from "../router";
import { store } from "../store.js";

// Helpers
import axios from "axios";

export default {
    name: "AppHeader",
    components: { router },
    data() {
        return {
            store,
        };
    },
    methods: {
        selectRandomRestaurant() {
            const restaurants = JSON.parse(localStorage.getItem("restaurants"));
            const randomIndex = Math.floor(Math.random() * restaurants.length);
            const restaurantId = restaurants[randomIndex].id;
            return `${restaurantId}`;
        },

        redirectToCheckout() {
            // close the offcanvas
            this.$nextTick(() => {
                this.$el.closest(".offcanvas").classList.remove("show");
            });

            // redirect to checkout page
            this.$router.push({ name: "checkout" });
        },
        // SHOPPING CART
        removeFromCart(index) {
            let item = this.store.cart[index];
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                this.store.cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(this.store.cart));
        },

        addToCart(index) {
            let item = this.store.cart[index];
            item.quantity++;
            localStorage.setItem("cart", JSON.stringify(this.store.cart));
        },

        emptyCart() {
            this.store.cart = [];
            localStorage.setItem("cart", JSON.stringify(this.store.cart));
        },
        initFinisherHeader() {
            new FinisherHeader({
                count: 24,
                size: {
                    min: 1085,
                    max: 1500,
                    pulse: 1,
                },
                speed: {
                    x: {
                        min: 0.1,
                        max: 0.6,
                    },
                    y: {
                        min: 0.1,
                        max: 0.5,
                    },
                },
                colors: {
                    background: "#000000",
                    particles: [
                        "#000000",
                        "#363636",
                        "#000000",
                        "#100f0f",
                        "#000000",
                    ],
                },
                blending: "screen",
                opacity: {
                    center: 0.2,
                    edge: 0.2,
                },
                skew: 0,
                shapes: ["c", "s"],
            });
        },
    },
    computed: {
        cartCount() {
            let count = 0;
            this.store.cart.forEach((item) => {
                count += item.quantity;
            });
            return count;
        },

        totalPrice() {
            const deliveryFee = this.restaurantDeliveryFee;
            const hasDeliveryFee =
                deliveryFee !== "" &&
                deliveryFee !== null &&
                !isNaN(parseFloat(deliveryFee));
            const cartTotal = this.store.cart.reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);
            const total = hasDeliveryFee
                ? parseFloat(deliveryFee) + cartTotal
                : cartTotal;
            return total.toFixed(2);
        },

        restaurantName() {
            const restaurantId =
                this.store.cart.length > 0
                    ? this.store.cart[0].restaurant_id
                    : null;
            if (restaurantId) {
                const restaurant = this.store.restaurant;
                if (restaurant && restaurant.id === restaurantId) {
                    return restaurant.name;
                }
            }
            return "Carrello vuoto";
        },

        restaurantDeliveryFee() {
            const restaurantId =
                this.store.cart.length > 0
                    ? this.store.cart[0].restaurant_id
                    : null;
            if (restaurantId) {
                const restaurant = this.store.restaurant;
                if (restaurant && restaurant.id === restaurantId) {
                    return restaurant.prezzo_spedizione;
                }
            }
            return "";
        },
    },
    mounted() {
        this.initFinisherHeader();
        this.store.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    },
};
</script>

<template>
    <header class="container-fluid finisher-header p-2">
        <div class="container-xxl heigthBox">
            <div class="bigScreen  d-flex justify-content-between align-items-center">
                <div class="logo">
                    <a v-if="$route.path === '/'" class="" href="#">
                        <div class="imgContainer pb-1 px-1">
                            <img src="../img/7.png" alt="Logo" />
                        </div>
                    </a>
                    <router-link v-else class="text-decoration-none text-dark" :to="{
                            name: 'home',
                        }">
                        <div class="imgContainer">
                            <img src="../img/7.png" alt="Logo" />
                        </div>
                    </router-link>
                </div>
                <nav class="header-nav">
                    <ul class="d-flex justify-content-center">
                        <li class="home">
                            <a :class="$route.path === '/' ? 'selected' : ''" href="/">
                                Home
                            </a>
                        </li>
                        <li>
                            <router-link :class="$route.path.includes('/Attivita') ? 'selected' : ''"
                                :to="'Attivita' + selectRandomRestaurant()">Scegli per me</router-link>
                        </li>

                        <li>
                            <router-link :class="$route.path.includes('/Cucine') ? 'selected' : ''"
                                :to="{ name: 'Cucine' }">
                                Cucine
                            </router-link>
                        </li>
                        <li>
                            <router-link :class="$route.path.includes('/about-us') ? 'selected' : ''"
                                :to="{ name: 'about-us' }">
                                Chi siamo
                            </router-link>
                        </li>
                    </ul>
                </nav>
                <div class="AreaPartner">
                    <a class="nav-link" aria-current="page" :href="this.store.backEndLink + '/login'">
                        <i class="fa-solid fa-user"> </i> Area Partner
                    </a>
                </div>

                <div class="d-flex align-items-center">
                    <!-- Button trigger modal -->
                    <button v-if="$route.path.includes('/Attivita') ||
                        $route.path.includes('/checkout')
                        " type="button" class="responsiveButton btn btn-light d-flex py-2" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                        <i class="fa-solid fa-cart-shopping me-1 pt-1"></i>
                        <span class="badge bg-secondary ms-2 pt-2">{{ cartCount }}</span>
                    </button>
                </div>
            </div>
            <div class="smallScreen d-flex justify-content-between align-items-center">
                <div class="logo">
                    <a v-if="$route.path === '/'" class="" href="#">
                        <div class="imgContainer pb-1 px-1">
                            <img src="../img/7.png" alt="Logo" />
                        </div>
                    </a>
                    <router-link v-else class="text-decoration-none text-dark" :to="{
                            name: 'home',
                        }">
                        <div class="imgContainer">
                            <img src="../img/7.png" alt="Logo" />
                        </div>
                    </router-link>
                </div>
                <nav class="header-nav">
                    <ul class="d-flex justify-content-center">
                        <li class="home">
                            <a :class="$route.path === '/' ? 'selected' : ''" href="/">
                                <i class="iconcina fa-solid fa-house"></i>
                            </a>
                        </li>
                        <li>
                            <router-link :class="$route.path.includes('/Attivita') ? 'selected' : ''"
                                :to="'Attivita' + selectRandomRestaurant()">
                                <i class="iconcina fa-solid fa-shuffle"></i>
                            </router-link>
                        </li>

                        <li>
                            <router-link :class="$route.path.includes('/Cucine') ? 'selected' : ''"
                                :to="{ name: 'Cucine' }">
                                <i class="iconcina fa-solid fa-kitchen-set"></i>
                            </router-link>
                        </li>
                        <li>
                            <router-link :class="$route.path.includes('/about-us') ? 'selected' : ''"
                                :to="{ name: 'about-us' }">
                                <i class="iconcina fa-solid fa-people-group"></i>
                            </router-link>
                        </li>
                    </ul>
                </nav>
                <div class="AreaPartner">
                    <a class="nav-link" aria-current="page" :href="this.store.backEndLink + '/login'">
                        Area Partner
                    </a>
                </div>

                <div class="d-flex align-items-center">
                    <!-- Button trigger modal -->
                    <button v-if="$route.path.includes('/Attivita') ||
                        $route.path.includes('/checkout')
                        " type="button" class="responsiveButton btn btn-light d-flex py-2" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                        <i class="fa-solid fa-cart-shopping me-1 pt-1"></i>
                        <span class="badge bg-secondary ms-2 pt-2">{{ cartCount }}</span>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- SHOPPING CART OFFCANVAS -->
    <div v-if="$route.path === '/checkout' || $route.path.includes('Attivita')" class="offcanvas offcanvas-end"
        data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
                <strong>{{ restaurantName }}</strong>
                <strong v-if="cartCount > 0" class="text-danger">
                    <i class="fa-solid fa-truck-fast mx-2"></i>{{ restaurantDeliveryFee + " €" }}
                </strong>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul>
                <h4 v-if="cartCount == 0">Aggiungi un prodotto al carrello!</h4>
                <div v-else>
                    <strong>Prodotti:</strong>
                </div>
                <li v-for="(item, index) in store.cart" :key="index"
                    class="d-flex align-items-center my-1 bg-dark bg-opacity-10 p-2 rounded">
                    <div class="w-100">
                        {{ item.name }}
                    </div>

                    <div class="w-25">
                        {{ item.price + "€" }}
                    </div>

                    <div class="mx-3">x</div>
                    <div>
                        {{ item.quantity }}
                    </div>

                    <div class="d-flex flex-row mx-2">
                        <button class="btn btn-danger me-2" @click="removeFromCart(index)">
                            -
                        </button>

                        <button class="btn btn-success" @click="addToCart(index)">
                            +
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="d-flex flex-column">
            <h3 class="text-center my-2">
                Prezzo totale:
                <span class="text-danger">{{ totalPrice }} €</span>
            </h3>
            <!-- EMPTY CART-->
            <button class="btn btn-danger mx-5" @click="emptyCart" v-if="cartCount > 0">
                <i class="fa-solid fa-trash"></i>
            </button>

            <!--PAY -> CHECKOUT PAGE -->
            <router-link v-if="cartCount > 0" @click="redirectToCheckout" data-bs-dismiss="offcanvas" :to="{
                    name: 'checkout',
                }" class="btn btn-primary mx-5 my-2">
                Checkout
            </router-link>
        </div>
    </div>
    <!-- SHOPPING CART OFFCANVAS -->
    <div v-if="$route.path === '/checkout' || $route.path.includes('Attivita')" class="offcanvas offcanvas-end"
        data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
                <strong>{{ restaurantName }}</strong>
                <strong v-if="cartCount > 0" class="text-danger">
                    <i class="fa-solid fa-truck-fast mx-2"></i>{{ restaurantDeliveryFee + " €" }}
                </strong>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul>
                <h4 v-if="cartCount == 0">Aggiungi un prodotto al carrello!</h4>
                <div v-else>
                    <strong>Prodotti:</strong>
                </div>
                <li v-for="(item, index) in store.cart" :key="index"
                    class="d-flex align-items-center my-1 bg-dark bg-opacity-10 p-2 rounded">
                    <div class="w-100">
                        {{ item.name }}
                    </div>

                    <div class="w-25">
                        {{ item.price + "€" }}
                    </div>

                    <div class="mx-3">x</div>
                    <div>
                        {{ item.quantity }}
                    </div>

                    <div class="d-flex flex-row mx-2">
                        <button class="btn btn-danger me-2" @click="removeFromCart(index)">
                            -
                        </button>

                        <button class="btn btn-success" @click="addToCart(index)">
                            +
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="d-flex flex-column">
            <h3 class="text-center my-2">
                Prezzo totale:
                <span class="text-danger">{{ totalPrice }} €</span>
            </h3>
            <!-- EMPTY CART-->
            <button class="btn btn-danger mx-5" @click="emptyCart" v-if="cartCount > 0">
                <i class="fa-solid fa-trash"></i>
            </button>

            <!--PAY -> CHECKOUT PAGE -->
            <router-link v-if="cartCount > 0" @click="redirectToCheckout" data-bs-dismiss="offcanvas" :to="{
                    name: 'checkout',
                }" class="btn btn-primary mx-5 my-2">
                Checkout
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.fa-solid.fa-bars {
    color: #fd456b;
}

header {
    height: 100px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    top: 0;
    left: 0;
    z-index: 6;
    position: fixed;

    .heigthBox {
        height: 100px;

        .imgContainer {
            width: 119px;
            height: 67px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .header-nav {
        width: 76%;

        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;

            li {
                margin: 30px 40px;
            }

            .selected {
                color: #fd456b;

                &:hover {
                    color: #ffa500;
                }
            }

            a {
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-size: 17px;
                font-family: "Comfortaa", cursive;
            }

            a:hover {
                color: #fd456b;
            }
        }
    }

    .AreaPartner {
        width: 12%;
        color: white;
        font-weight: bold;
        font-size: 17px;
        font-family: "Comfortaa", cursive;

        .nav-link {
            font-family: "Comfortaa", cursive;
        }
    }

    .AreaPartner:hover {
        color: #fd456b;
    }
}

.offcanvas {
    width: 20%;
    z-index: 1;
    padding-top: 125px;

    li:hover {
        color: #cb3234;
    }

    ul {
        padding-left: 0 !important;
    }
}

.logo {
    width: 12%;
    margin: 0px !important;
}

@media screen and (max-width: 320px) {

    .bigScreen {
        display: none !important;

    }

    .smallScreen {
        display: block;

    }

    .nav-link {
        font-size: 9px;
    }

    .iconcina {
        font-size: 13px;
        padding: 0px -20px;
        margin: 0px -12px;
    }

    .fa-solid.fa-bars {
        color: #fd456b;
    }

    header {
        height: 100px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        top: 0;
        left: 0;
        z-index: 6;
        position: fixed;

        .heigthBox {
            height: 100px;
            position: relative;

            .imgContainer {
                width: 67px;
                height: 39px;
                margin: -14px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .header-nav {
            ul {
                list-style: none;

                li {
                    margin: 30px 15px;
                }

                .selected {
                    color: #fd456b;

                    &:hover {
                        color: #ffa500;
                    }
                }

                a {
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 12px;
                    font-family: "Comfortaa", cursive;
                }

                a:hover {
                    color: #fd456b;
                }
            }
        }

        .AreaPartner {
            color: white;
            font-weight: bold;
            font-size: 12px;
            font-family: "Comfortaa", cursive;

            .nav-link {
                font-family: "Comfortaa", cursive;
            }
        }

        .AreaPartner:hover {
            color: #fd456b;
        }
    }


    .offcanvas {
        width: 20%;
        z-index: 1;
        padding-top: 125px;

        li:hover {
            color: #cb3234;
        }

        ul {
            padding-left: 0 !important;
        }
    }

    .logo {
        width: 12%;
        margin: 0px !important;
    }

}


@media screen and (min-width: 320px) and (max-width: 386px) {


    .bigScreen {
        display: none !important;

    }

    .smallScreen {
        display: block;

    }

    .nav-link {
        font-size: 9px;
    }

    .iconcina {
        font-size: 13px;
        padding: 0px -20px;
        margin: 0px -12px;
    }

    .fa-solid.fa-bars {
        color: #fd456b;
    }

    header {
        height: 100px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        top: 0;
        left: 0;
        z-index: 6;
        position: fixed;

        .heigthBox {
            height: 100px;
            position: relative;

            .imgContainer {
                width: 67px;
                height: 39px;
                margin: -14px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .header-nav {
            ul {
                list-style: none;

                li {
                    margin: 30px 16px;
                }

                .selected {
                    color: #fd456b;

                    &:hover {
                        color: #ffa500;
                    }
                }

                a {
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 12px;
                    font-family: "Comfortaa", cursive;
                }

                a:hover {
                    color: #fd456b;
                }
            }
        }

        .AreaPartner {
            color: white;
            font-weight: bold;
            font-size: 19px;
            font-family: "Comfortaa", cursive;

            .nav-link {
                font-family: "Comfortaa", cursive;
            }
        }

        .AreaPartner:hover {
            color: #fd456b;
        }
    }


    .offcanvas {
        width: 20%;
        z-index: 1;
        padding-top: 125px;

        li:hover {
            color: #cb3234;
        }

        ul {
            padding-left: 0 !important;
        }
    }

    .logo {
        width: 12%;
        margin: 0px !important;
    }

}



@media screen and (min-width: 386px) and (max-width: 504px) {

    .bigScreen {
        display: none !important;

    }

    .smallScreen {
        display: block;

    }

    .nav-link {
        font-size: 9px;
    }

    .iconcina {
        font-size: 15px;
        padding: 0px -20px;
        margin: 0px -12px;
    }

    .fa-solid.fa-bars {
        color: #fd456b;
    }

    header {
        height: 100px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        top: 0;
        left: 0;
        z-index: 6;
        position: fixed;

        .heigthBox {
            height: 100px;
            position: relative;

            .imgContainer {
                width: 79px;
                height: 46px;
                margin: -14px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .header-nav {
            ul {
                list-style: none;

                li {
                    margin: 30px 22px;
                }

                .selected {
                    color: #fd456b;

                    &:hover {
                        color: #ffa500;
                    }
                }

                a {
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 12px;
                    font-family: "Comfortaa", cursive;
                }

                a:hover {
                    color: #fd456b;
                }
            }
        }

        .AreaPartner {
            color: white;
            font-weight: bold;
            font-size: 12px;
            font-family: "Comfortaa", cursive;

            .nav-link {
                font-family: "Comfortaa", cursive;
            }
        }

        .AreaPartner:hover {
            color: #fd456b;
        }
    }


    .offcanvas {
        width: 20%;
        z-index: 1;
        padding-top: 125px;

        li:hover {
            color: #cb3234;
        }

        ul {
            padding-left: 0 !important;
        }
    }

    .logo {
        width: 12%;
        margin: 0px !important;
    }

}

@media screen and (min-width: 504px) and (max-width: 592px) {

    .bigScreen {
        display: none !important;

    }

    .smallScreen {
        display: block;

    }

    .nav-link {
        font-size: 9px;
    }

    .iconcina {
        font-size: 15px;
        padding: 0px -20px;
        margin: 0px -12px;
    }

    .fa-solid.fa-bars {
        color: #fd456b;
    }

    header {
        height: 100px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        top: 0;
        left: 0;
        z-index: 6;
        position: fixed;

        .heigthBox {
            height: 100px;
            position: relative;

            .imgContainer {
                width: 79px;
                height: 46px;
                margin: -14px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .header-nav {
            ul {
                list-style: none;

                li {}

                .selected {
                    color: #fd456b;

                    &:hover {
                        color: #ffa500;
                    }
                }

                a {
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 12px;
                    font-family: "Comfortaa", cursive;
                }

                a:hover {
                    color: #fd456b;
                }
            }
        }

        .AreaPartner {
            color: white;
            font-weight: bold;
            font-size: 12px;
            font-family: "Comfortaa", cursive;

            .nav-link {
                font-family: "Comfortaa", cursive;
            }
        }

        .AreaPartner:hover {
            color: #fd456b;
        }
    }


    .offcanvas {
        width: 20%;
        z-index: 1;
        padding-top: 125px;

        li:hover {
            color: #cb3234;
        }

        ul {
            padding-left: 0 !important;
        }
    }

    .logo {
        width: 12%;
        margin: 0px !important;
    }

}




@media screen and (min-width: 592px) and (max-width: 600px) {

    .bigScreen {
        display: none !important;

    }

    .smallScreen {
        display: block;

    }

    .nav-link {
        font-size: 13px;
    }

    .iconcina {
        font-size: 21px;
        padding: 0px 5px 0px 0px;
        margin: 0px -12px;
    }

    .fa-solid.fa-bars {
        color: #fd456b;
    }

    header {
        height: 100px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        top: 0;
        left: 0;
        z-index: 6;
        position: fixed;

        .heigthBox {
            height: 100px;
            position: relative;

            .imgContainer {
                width: 79px;
                height: 46px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .header-nav {
            ul {
                list-style: none;

                li {}

                .selected {
                    color: #fd456b;

                    &:hover {
                        color: #ffa500;
                    }
                }

                a {
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 12px;
                    font-family: "Comfortaa", cursive;
                }

                a:hover {
                    color: #fd456b;
                }
            }
        }

        .AreaPartner {
            color: white;
            font-weight: bold;
            font-size: 12px;
            font-family: "Comfortaa", cursive;

            .nav-link {
                font-family: "Comfortaa", cursive;
            }
        }

        .AreaPartner:hover {
            color: #fd456b;
        }
    }


    .offcanvas {
        width: 20%;
        z-index: 1;
        padding-top: 125px;

        li:hover {
            color: #cb3234;
        }

        ul {
            padding-left: 0 !important;
        }
    }

    .logo {
        width: 12%;
        margin: 0px !important;
    }

}


@media screen and (min-width: 600px) and (max-width: 767px) {


    .bigScreen {
        display: none !important;

    }

    .smallScreen {
        display: block;

    }

    .nav-link {
        font-size: 10px;
    }

    .iconcina {
        font-size: 21px;
        padding: 0px 0px;
        margin: 0px -12px;
    }

    .fa-solid.fa-bars {
        color: #fd456b;
    }

    header {
        height: 100px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        top: 0;
        left: 0;
        z-index: 6;
        position: fixed;

        .heigthBox {
            height: 100px;
            position: relative;

            .imgContainer {
                width: 100px;
                height: 59px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .header-nav {
            ul {
                list-style: none;

                li {}

                .selected {
                    color: #fd456b;

                    &:hover {
                        color: #ffa500;
                    }
                }

                a {
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 12px;
                    font-family: "Comfortaa", cursive;
                }

                a:hover {
                    color: #fd456b;
                }
            }
        }

        .AreaPartner {
            color: white;
            font-weight: bold;
            font-size: 12px;
            font-family: "Comfortaa", cursive;

            .nav-link {
                font-family: "Comfortaa", cursive;
            }
        }

        .AreaPartner:hover {
            color: #fd456b;
        }
    }


    .offcanvas {
        width: 20%;
        z-index: 1;
        padding-top: 125px;

        li:hover {
            color: #cb3234;
        }

        ul {
            padding-left: 0 !important;
        }
    }

    .logo {
        width: 12%;
        margin: 0px !important;
    }

}

@media screen and (min-width: 767px) and (max-width: 1026px) {
    .bigScreen {
        display: none !important;

    }

    .smallScreen {
        display: block;

    }

    .nav-link {
        font-size: 13px;
    }

    .iconcina {
        font-size: 25px;
        padding: 0px 10px;
    }
}

@media screen and (min-width: 1026px) and (max-width: 1141px) {

    .bigScreen {
        display: block;

    }

    .smallScreen {
        display: none !important;

    }

    .fa-solid.fa-bars {
        color: #fd456b;
    }

    header {
        height: 100px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        top: 0;
        left: 0;
        z-index: 6;
        position: fixed;

        .heigthBox {
            height: 100px;

            .imgContainer {
                width: 119px;
                height: 67px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .header-nav {
            width: 76%;

            ul {
                list-style: none;
                margin: 0;
                padding: 0;
                display: flex;

                li {
                    margin: 30px 40px;
                }

                .selected {
                    color: #fd456b;

                    &:hover {
                        color: #ffa500;
                    }
                }

                a {
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 17px;
                    font-family: "Comfortaa", cursive;
                }

                a:hover {
                    color: #fd456b;
                }
            }
        }

        .AreaPartner {
            width: 14%;
            color: white;
            font-weight: bold;
            font-size: 17px;
            font-family: "Comfortaa", cursive;

            .nav-link {
                font-family: "Comfortaa", cursive;
            }
        }

        .AreaPartner:hover {
            color: #fd456b;
        }
    }

    .offcanvas {
        width: 20%;
        z-index: 1;
        padding-top: 125px;

        li:hover {
            color: #cb3234;
        }

        ul {
            padding-left: 0 !important;
        }
    }

    .logo {
        width: 12%;
        margin: 0px !important;
    }
}

@media screen and (min-width: 1026px) {

    .smallScreen {
        display: none !important;
    }

    .bigScreen {
        display: block;

    }
}
</style>
