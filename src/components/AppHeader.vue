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
        <div
            class="container-xxl heigthBox d-flex justify-content-between align-items-center"
        >
            <div class="logo">
                <a v-if="$route.path === '/'" class="" href="#">
                    <div class="imgContainer pb-1 px-1">
                        <img src="../img/7.png" alt="Logo" />
                    </div>
                </a>
                <router-link
                    v-else
                    class="text-decoration-none text-dark"
                    :to="{
                        name: 'home',
                    }"
                >
                    <div class="imgContainer">
                        <img src="../img/7.png" alt="Logo" />
                    </div>
                </router-link>
            </div>
            <nav class="header-nav">
                <ul class="d-flex justify-content-center">
                    <li><a href="#">Menú</a></li>
                    <li><a href="#">Ristoranti</a></li>
                    <li>
                        <router-link :to="{ name: 'Cucine' }">
                            Cucine
                        </router-link>
                    </li>

                    <li>
                        <router-link :to="{ name: 'about-us' }">
                            Chi siamo
                        </router-link>
                    </li>
                </ul>
            </nav>
            <div class="AreaPartner">
                <a
                    class="nav-link"
                    aria-current="page"
                    :href="this.store.backEndLink + '/login'"
                    ><i class="fa-solid fa-user mx-2"> </i> Area Partner
                </a>
            </div>

            <div class="d-flex align-items-center">
                <!-- Button trigger modal -->
                <button
                    v-if="
                        $route.path.includes('/Attivita') ||
                        $route.path.includes('/checkout')
                    "
                    type="button"
                    class="btn btn-primary mx-2"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasScrolling"
                    aria-controls="offcanvasScrolling"
                >
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span class="badge bg-secondary ms-2">{{ cartCount }}</span>
                </button>
                <!-- Button trigger Offcanvas 
                <button class="btn btn-danger" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight">
                    <i class="fa-solid fa-bars"></i>
                </button>
                -->
            </div>
        </div>
    </header>

    <!-- SHOPPING CART OFFCANVAS -->
    <div
        v-if="$route.path === '/checkout' || $route.path.includes('Attivita')"
        class="offcanvas offcanvas-end"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
    >
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
                <strong>{{ restaurantName }}</strong>
                <strong v-if="cartCount > 0" class="text-danger">
                    <i class="fa-solid fa-truck-fast mx-2"></i
                    >{{ restaurantDeliveryFee + " €" }}
                </strong>
            </h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
            ></button>
        </div>
        <div class="offcanvas-body">
            <ul>
                <h4 v-if="cartCount == 0">Aggiungi un prodotto al carrello!</h4>
                <div v-else>
                    <strong>Prodotti:</strong>
                </div>
                <li
                    v-for="(item, index) in store.cart"
                    :key="index"
                    class="d-flex align-items-center my-1 bg-dark bg-opacity-10 p-2 rounded"
                >
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
                        <button
                            class="btn btn-danger me-2"
                            @click="removeFromCart(index)"
                        >
                            -
                        </button>

                        <button
                            class="btn btn-success"
                            @click="addToCart(index)"
                        >
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
            <button
                class="btn btn-danger mx-5"
                @click="emptyCart"
                v-if="cartCount > 0"
            >
                <i class="fa-solid fa-trash"></i>
            </button>

            <!--PAY -> CHECKOUT PAGE -->
            <router-link
                v-if="cartCount > 0"
                @click="redirectToCheckout"
                data-bs-dismiss="offcanvas"
                :to="{
                    name: 'checkout',
                }"
                class="btn btn-primary mx-5 my-2"
            >
                Checkout
            </router-link>
        </div>
    </div>
    <!-- OFFCANVAS -->
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
    z-index: 1030;
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

            a {
                color: #fd456b;
                text-decoration: none;
                font-weight: bold;
                font-size: 17px;
            }

            a:hover {
                color: white;
            }
        }
    }

    .AreaPartner {
        width: 12%;
        color: white;
        font-weight: bold;
        font-size: 17px;
    }

    .AreaPartner:hover {
        color: #fd456b;
    }
}

.offcanvas {
    width: 20%;
    z-index: 0;
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
</style>
