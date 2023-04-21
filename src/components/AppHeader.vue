<script>
import { store } from "../store.js";

// Helpers
import axios from "axios";

export default {
    name: "AppHeader",
    components: {},
    data() {
        return {
            store,
            darkTheme: false,
        };
    },
    methods: {
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
    },
    computed: {
        cartCount() {
            let count = 0;
            this.store.cart.forEach((item) => {
                count += item.quantity;
            });
            return count;
        },
    },
    mounted() {
        this.store.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    },
};
</script>

<template>
    <header class="sticky-top p-2">
        <nav class="container d-flex justify-content-between">
            <div class="logo">
                <a
                    v-if="$route.path === '/'"
                    class="text-decoration-none text-dark"
                    href="#"
                >
                    <img src="../img/1.png" alt="Logo" />
                </a>
                <router-link
                    v-else
                    class="text-decoration-none text-dark"
                    :to="{
                        name: 'home',
                    }"
                >
                    <img src="" alt="Logo" />
                    Nome Logo
                </router-link>
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
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span class="badge bg-secondary ms-2">{{ cartCount }}</span>
                </button>

                <!-- Button trigger Offcanvas -->
                <button
                    class="btn btn-primary"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                >
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>
        </nav>
    </header>
    <!-- OFFCANVAS -->
    <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
    >
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">MENU</h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
            ></button>
        </div>
        <div class="offcanvas-body">
            <div>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            aria-current="page"
                            :href="this.store.backEndLink + '/login'"
                            ><i class="fa-solid fa-user mx-2"> </i> Area Partner
                        </a>
                    </li>
                    <li class="nav-item">
                        <div
                            v-if="darkTheme == false"
                            @click="switchTheme()"
                            id="changeTheme2"
                        >
                            <i class="fa-solid fa-sun fs-6 mx-2"></i> Light Mode
                        </div>
                        <div v-else id="changeTheme" @click="switchTheme()">
                            <i class="fa-solid fa-moon fs-6 mx-2"></i> Dark Mode
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- OFFCANVAS -->

    <!-- SHOPPING CART MODAL -->
    <div
        class="modal fade modal-lg"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Shopping Cart
                    </h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <ul>
                        <li v-for="(item, index) in store.cart" :key="index">
                            {{ item.name }} x {{ item.quantity }}
                            <button @click="removeFromCart(index)">
                                Remove from cart
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <router-link
                        :to="{
                            name: 'checkout',
                        }"
                    >
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                        >
                            PAGA (Napoli 6 🍐 in 3 partite )
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <!-- SHOPPING CART MODAL -->
</template>

<style lang="scss" scoped>
header {
    border: 2px dashed black;
    background-color: lightblue;
}

.offcanvas {
    width: 20%;

    li:hover {
        color: #cb3234;
    }

    #changeTheme {
        cursor: pointer;
    }

    #changeTheme2 {
        cursor: pointer;
    }
}

.logo {
    width: 130px;
    height: 74px;
    margin: 0px !important;

    //DETTAGLI LOGO
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
