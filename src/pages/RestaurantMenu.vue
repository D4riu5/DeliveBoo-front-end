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
            cardStates: [], // an array to store the flipped state of each card
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
            // if cart has items from a restaurant, when you try to buy from a different one
            if (
                this.store.cart.length &&
                this.store.cart[0].restaurant_id !== item.restaurant_id
            ) {
                // show modal
                $("#exampleModal").modal("show");
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

        emptyCart() {
            this.store.cart = [];
            localStorage.setItem("cart", JSON.stringify(this.store.cart));
        },

        displayCourseName(course) {
            const courseMap = {
                Antipasto: "Antipasti",
                Primo: "Primi",
                Secondo: "Secondi",
                Contorno: "Contorni",
                Dolce: "Dolci",
                Bevanda: "Bevande",
            };
            return courseMap[course] || course;
        },
    },
    created() {
        this.getFoods();
    },
    watch: {
        "$route.params.id": function (newId, oldId) {
            if (newId && newId !== oldId && /^[1-9]\d*$/.test(newId)) {
                this.getFoods();
            }
        },
    },
    mounted() {
        if (store.restaurant.foods) {
            this.$nextTick(() => {
                // loop through the cards and initialize their flipped state to false
                for (let i = 0; i < this.store.foods.length; i++) {
                    this.cardStates.push(false);
                }
            });
        }
    },
    computed: {
        courses() {
            const courses = new Set();
            this.store.foods.forEach((food) => courses.add(food.course));
            return Array.from(courses).sort((a, b) => {
                const order = [
                    "Antipasto",
                    "Primo",
                    "Secondo",
                    "Contorno",
                    "Dolce",
                    "Bevanda",
                ];
                return order.indexOf(a) - order.indexOf(b);
            });
        },
    },
};
</script>

<template>
    <section>
        <!-- RESTAURANT HEADER -->
        <div class="restaurant-header d-flex position-relative">
            <img
                class="img-fluid"
                :src="store.restaurant.full_image_restaurant"
                :alt="store.restaurant.name"
            />
            <div
                class="p-4 restaurant-banner position-absolute translate-middle bg-white rounded"
            >
                <h1 class="fw-bold" style="font-size: 60px">
                    {{ store.restaurant.name }}
                </h1>

                <ul class="d-flex flex-row list-group">
                    <li>
                        <i class="fa-solid fa-location-dot mx-1"></i
                        >{{ store.restaurant.address }}
                    </li>
                    <li class="mx-3">
                        <i class="fa-solid fa-clock mx-1"></i> 20-30'
                    </li>
                    <li
                        style="padding: 1px; margin-top: -1px"
                        :class="
                            store.restaurant.prezzo_spedizione == 0
                                ? 'bg-warning rounded'
                                : ''
                        "
                    >
                        <i class="fa-solid fa-truck-fast mx-1"></i>
                        Spedizione:
                        {{
                            store.restaurant.prezzo_spedizione == 0
                                ? "Gratuita!"
                                : store.restaurant.prezzo_spedizione + " €"
                        }}
                    </li>
                </ul>
            </div>
        </div>
        <!--/ RESTAURANT HEADER -->

        <!-- RESTAURANT MENU -->
        <div class="restaurant-menu d-flex flex-column">
            <div class="menu-container ps-2 mb-5 d-flex">
                <!-- left side -->
                <div class="sticky-wrapper">
                    <div class="mx-3">
                        <ul>
                            <li v-for="course in courses" :key="course">
                                {{ displayCourseName(course) }}
                            </li>
                        </ul>
                    </div>
                </div>
                <!--/ left side -->

                <!-- right side -->
                <div class="mx-3 food-container ps-4">
                    <!-- FOOD -->
                    <div v-for="course in courses" :key="course" class="mb-5">
                        <h3 class="fw-bold">{{ displayCourseName(course) }}</h3>
                        <div
                            class="d-flex flex-row flex-wrap"
                            style="width: 80%"
                        >
                            <div
                                v-for="(food, index) in store.foods"
                                :key="food.name"
                                class=""
                            >
                                <div
                                    v-if="food.course === course"
                                    class="js_container m-3"
                                >
                                    <div
                                        class="flip_box"
                                        :class="{
                                            flipped: cardStates[index],
                                        }"
                                    >
                                        <div
                                            class="front d-flex p-4 rounded border border-dark border-1"
                                        >
                                            <div
                                                class="me-4 rounded d-flex"
                                                style="
                                                    min-width: 130px;
                                                    max-width: 180px;
                                                "
                                            >
                                                <img
                                                    class="rounded"
                                                    :src="food.full_image_food"
                                                    :alt="food.name"
                                                />
                                            </div>
                                            <div class="d-flex flex-column">
                                                <p class="f_title fs-3">
                                                    {{ food.name }}
                                                </p>
                                                <p class="f_subline w-75 fs-6">
                                                    {{ food.description }}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            class="back d-flex flex-column justify-content-between p-4 rounded border border-dark border-1"
                                        >
                                            <div>
                                                <p class="b_text fs-3">
                                                    {{ food.name }}
                                                </p>
                                                <div class="d-flex flex-row">
                                                    <span
                                                        class="me-3 fs-6 text-primary"
                                                    >
                                                        <i
                                                            class="fa-solid fa-fire-flame-curved"
                                                        ></i>
                                                        {{
                                                            food.food_detail
                                                                .kcal
                                                        }}
                                                        Kcal
                                                    </span>
                                                    <span
                                                        v-if="
                                                            food.food_detail
                                                                .spicy
                                                        "
                                                        class="me-3 fs-6 text-danger"
                                                    >
                                                        <i
                                                            class="fa-solid fa-pepper-hot"
                                                        ></i>
                                                        Piccante
                                                    </span>
                                                    <span
                                                        v-if="
                                                            food.food_detail
                                                                .gluten_free
                                                        "
                                                        class="me-3 fs-6 text-success"
                                                    >
                                                        <i
                                                            class="fa-solid fa-bread-slice"
                                                        ></i>
                                                        Senza Glutine
                                                    </span>
                                                    <span
                                                        v-else
                                                        class="me-3 fs-6"
                                                    >
                                                        <i
                                                            class="fa-solid fa-wheat-awn-circle-exclamation"
                                                        ></i>
                                                        Il prodotto contiene
                                                        glutine
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                class="d-flex flex-row align-items-center"
                                            >
                                                <span
                                                    class="f_subline me-4 fs-3 fw-bold"
                                                    >{{ food.price }} €</span
                                                >

                                                <button
                                                    id="add"
                                                    class="btn btn-danger px-3 py-2"
                                                    @click="addToCart(food)"
                                                >
                                                    <i
                                                        class="fa-solid fa-cart-shopping fs-5"
                                                    ></i
                                                    ><span class="mx-3 fs-5"
                                                        >Aggiungi al
                                                        carrello</span
                                                    >
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="r_wrap"
                                        @click="
                                            cardStates[index] =
                                                !cardStates[index]
                                        "
                                    >
                                        <div
                                            class="b_round"
                                            :class="{
                                                b_round_hover:
                                                    cardStates[index],
                                            }"
                                        ></div>
                                        <div
                                            class="s_round"
                                            :class="{
                                                s_round_click:
                                                    cardStates[index],
                                            }"
                                        >
                                            <div
                                                class="s_arrow"
                                                :class="{
                                                    s_arrow_rotate:
                                                        cardStates[index],
                                                }"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- / FOOD -->
                </div>
                <!--/ right side -->
            </div>
        </div>

        <!--/ RESTAURANT MENU -->

        <!--Trying to buy from another restaurant Modal -->
        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            ATTENZIONE!
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <p>
                            Puoi ordinare da un solo ristorante alla volta!
                            <br />
                            Svuota il carrello per ordinare da un altro
                            ristorante!
                        </p>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button
                            type="button"
                            class="btn btn-danger"
                            data-bs-dismiss="modal"
                            @click="emptyCart"
                        >
                            Svuota Carrello
                        </button>
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div id="footer-Div"></div>
</template>

<style lang="scss" scoped>
.restaurant-header {
    max-height: 30vh;

    img {
        width: 100%;
        object-fit: cover;
        object-position: center;
        z-index: -1;
    }

    .restaurant-banner {
        width: 70%;
        top: 88%;
        left: 38%;
        z-index: 2;

        // box shadow
        -webkit-box-shadow: 0px 2px 24px -9px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 2px 24px -9px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 2px 24px -9px rgba(0, 0, 0, 0.75);
    }
}
.sticky-wrapper {
    position: sticky;
    top: 0;

    // bottom: calc(100% - (100vh - #footer-Div.offsetTop));
}

.restaurant-menu {
    background-color: #eeeeee;
    .menu-container {
        padding-top: 20px;
        padding-bottom: 20px;

        margin-top: 85px;
        min-height: 80vh;
        overflow: auto;
    }
}

.food-container {
    img {
        width: 100%;
        object-fit: cover;
        object-position: center;
    }

    h1,
    p,
    a {
        color: black;
        letter-spacing: 0.02em;
        font-weight: 600;
    }

    h1,
    p,
    a {
    }

    h1 {
        font-size: 2.5em;
    }

    p {
        font-size: 1.5em;
        line-height: 25px;
    }

    button {
        border: 0;
        border-radius: 26px;
        padding-bottom: 2px;
    }

    .js_container,
    .flip-box,
    .front,
    .back {
        width: 560px;
        height: 240px;
    }

    .js_container,
    .flip_box {
        position: relative;
    }

    .front,
    .back {
        position: absolute;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .js_container {
        -moz-transform: perspective(1200px);
        -webkit-perspective: 1200px;
        perspective: 1200px;
    }

    .flip_box {
        transition: all 0.5s ease-out;
        -webkit-transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;
        transform-style: preserve-3d;
    }

    .front {
        background-color: white;
    }

    .f_title {
    }

    .f_subline {
    }

    .f_headline {
        line-height: 23px;
    }

    .back {
        background-color: white;
        -webkit-transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
        -ms-transform: rotateY(180deg);
        transform: rotateY(180deg);
    }

    .b_headline {
        padding-top: 50px;
    }

    .b_text {
    }

    .flipped {
        -webkit-transform: rotateY(-180deg);
        -moz-transform: rotateY(-180deg);
        -ms-transform: rotateY(-180deg);
        transform: rotateY(-180deg);
    }

    .r_wrap {
        position: absolute;
        right: 40px;
        bottom: 38px;
    }

    .b_round,
    .s_round {
        position: absolute;
        right: 0px;
        bottom: 0px;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background-color: #d21849;
        transition: all 0.2s linear;
    }

    .b_round {
        opacity: 0;
        background-color: #d21849;
    }

    .b_round_hover {
        transform: scale(1.37);
        opacity: 0.4;
    }

    .b_round_back_hover {
        background-color: #f60044;
    }

    .s_round_click {
        transform: scale(1.7);
    }

    .s_round_back {
        background-color: #c30c3d;
    }

    .s_arrow {
        width: 52px;
        height: 52px;
        background-image: url("https://img-fotki.yandex.ru/get/194549/29644339.5/0_d6c60_1d7815f0_orig");
        background-color: transparent;
        transition: all 0.35s linear;
    }

    .s_arrow_rotate {
        transform: rotate(-180deg);
    }
}
</style>
