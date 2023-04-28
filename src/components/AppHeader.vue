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
            darkTheme: false,
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

        switchTheme() {
            if (!this.darkTheme) {
                this.darkTheme = true;
            } else {
                this.darkTheme = false;
            }
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
        this.store.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    },
};
</script>

<template>
    <header class="finisher-header sticky-top p-2">
        <div class="heigthBox container d-flex justify-content-between align-items-center">
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
                    <img src="../img/7.png" alt="Logo" />
                </router-link>
            </div>
            <nav class="header-nav">
                <ul>
                    <li><a href="#">Menú</a></li>
                    <li><a href="#">Ristoranti</a></li>
                    <li><a href="#">Cucine</a></li>
                    <li>
                        <router-link :to="{ name: 'about-us' }">
                            Chi siamo
                        </router-link>
                    </li>
                </ul>
            </nav>

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

                <div class="dropdown-center">
                    <button
                        class="btn btn-warning"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i class="fa-solid fa-bars"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                aria-current="page"
                                :href="this.store.backEndLink + '/login'"
                                ><i class="fa-solid fa-user mx-2"> </i> Area
                                Partner
                            </a>
                        </li>
                        <li class="nav-item">
                            <div
                                v-if="darkTheme == false"
                                @click="switchTheme()"
                                id="changeTheme2"
                            >
                                <i class="fa-solid fa-sun fs-6 mx-2"></i> Light
                                Mode
                            </div>
                            <div v-else id="changeTheme" @click="switchTheme()">
                                <i class="fa-solid fa-moon fs-6 mx-2"></i> Dark
                                Mode
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Button trigger Offcanvas 
                <button class="btn btn-danger" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight">
                    <i class="fa-solid fa-bars"></i>
                </button>
                -->
            </div>
        </nav>
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
    height: 100%;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    top: -65;
    left: 0;
    right: 0;
    z-index: 10;
    .heigthBox {
        height:100px;
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
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;

            li {
                margin: 30px 40px;
            }

            a {
                color: #ffa500;
                text-decoration: none;
                font-weight: bold;
            }

            a:hover {
                color: #fd456b;
            }
        }
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
