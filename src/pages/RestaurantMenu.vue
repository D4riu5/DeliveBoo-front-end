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

        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
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
        // scroll to top
        this.$nextTick(() => {
            // scroll to top
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
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

        ratingToStars() {
            return (rating) => {
                const roundedRating = Math.ceil(rating / 2); // divide by 2 and round up
                const fullStars = "★".repeat(roundedRating); // repeat the star symbol
                const emptyStars = "☆".repeat(5 - roundedRating); // repeat the empty star symbol
                return fullStars + emptyStars; // concatenate the full and empty stars
            };
        },
    },
};
</script>

<template>
    <section>
        <!-- RESTAURANT HEADER -->
        <div class="restaurant-header d-flex position-relative">
            <img v-if="store.restaurant.full_image_restaurant"
                class="img-fluid"
                :src="store.restaurant.full_image_restaurant"
                :alt="store.restaurant.name"
            />
            <img v-else src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" alt="">
            <div
                class="p-4 restaurant-banner position-absolute translate-middle bg-white rounded"
            >
                <h1 class="fw-bold" style="font-size: 60px">
                    {{ store.restaurant.name }}
                </h1>

                <div
                    class="fw-bold fs-3"
                    style="color: orange; margin-top: -15px"
                >
                    {{ ratingToStars(store.restaurant.avg_rating) }}
                </div>
                <div class="d-flex flex-row justify-content-between">
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

                    <ul class="d-flex flex-row list-group">
                        <li
                            v-for="course in courses"
                            :key="course"
                            class="mx-3"
                        >
                            <a :href="'#' + course" class="text-danger">{{
                                displayCourseName(course)
                            }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--/ RESTAURANT HEADER -->

        <!-- RESTAURANT MENU -->
        <div class="restaurant-menu d-flex flex-column">
            <div class="menu-container ps-2 mb-5 d-flex" style="height: 70vh">
                <!-- lower side -->
                <div class="mx-3 food-container ps-5" ref="container">
                    <!-- FOOD -->
                    <div
                        v-for="course in courses"
                        :key="course"
                        class="mb-3"
                        :id="course"
                    >
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
                                                    v-if="food.full_image_food"
                                                    class="rounded"
                                                    :src="food.full_image_food"
                                                    :alt="food.name"
                                                />
                                                <img
                                                    v-else
                                                    class="rounded"
                                                    src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="d-flex flex-column">
                                                <p class="f_title fw-bold fs-5">
                                                    {{ food.name }}
                                                </p>
                                                <p class="f_subline w-75">
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
                                                        v-if="
                                                            food.food_detail
                                                                .spicy
                                                        "
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
                <!--/ lower side -->
            </div>
            <div class="d-flex justify-content-start mx-5 my-3 px-5">
                <button
                    id="special_button"
                    class="btn btn-danger"
                    @click="scrollToTop"
                >
                    <a href="#nogo"><i class="fa-solid fa-arrow-up"></i></a>
                </button>
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
div[id] {
    padding-top: 100px;
    margin-top: -100px;
}

.restaurant-header {
    max-height: 27vh;

    img {
        width: 100%;
        object-fit: cover;
        object-position: center;
        z-index: -1;
        filter: blur(2px);
    }

    .restaurant-banner {
        width: 70%;
        top: 75%;
        left: 38%;
        z-index: 2;

        // box shadow
        -webkit-box-shadow: 0px 2px 24px -9px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 2px 24px -9px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 2px 24px -9px rgba(0, 0, 0, 0.75);
    }
}

.restaurant-menu {
    background-color: #eeeeee;
    .menu-container {
        padding-bottom: 20px;

        margin-top: 70px;
        min-height: 80vh;
        overflow: auto;
    }

    a {
        text-decoration: none;
        color: white;
        padding: 10px 20px;
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
        margin-bottom: 5px !important;
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
        width: 540px;
        height: 180px;
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
        font-size: 14px;
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
