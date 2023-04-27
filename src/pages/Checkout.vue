<script>
// Helpers
import { store } from "../store";
import axios from "axios";

export default {
    name: "Checkout",
    components: {},
    data() {
        return {
            store,
            clientToken: "",
            showDropin: false,
            dropInLoaded: false,
            showLoading: false,
            order: {
                total_price: store.cart.reduce((total, item) => {
                    return total + item.price * item.quantity;
                }, 0),
                status: "In Preparazione",
                costumer_name: "",
                delivery_address: "",
                delivery_contact: "",
                food: store.cart,
            },
            errors: "",
        };
    },
    methods: {
        // if cart is empty go back btn method
        goBack() {
            window.history.back();
        },

        // BRAINTREE
        initializeBrainTree() {
            const self = this;

            braintree.dropin.create(
                {
                    authorization: this.clientToken,
                    container: "#dropin-container",
                    paypal: false,
                },
                function (createErr, instance) {
                    if (createErr) {
                        console.log(createErr);
                        return;
                    }

                    const submitButton =
                        document.querySelector("#submit-button");

                    submitButton.addEventListener("click", function (event) {
                        event.preventDefault();

                        instance.requestPaymentMethod(function (err, payload) {
                            if (err) {
                                console.log(err);
                                return;
                            }

                            // Hide "choose another way to pay"
                            const toggleElement =
                                document.querySelector(".braintree-toggle");
                            if (toggleElement) {
                                toggleElement.style.display = "none";
                            }

                            // SUBMIT FORM
                            axios
                                .post("http://127.0.0.1:8000/api/orders", {
                                    order: self.order,
                                })
                                .then((response) => {
                                    console.log(response);
                                    // IF RESPONSE IS SUCCESSFUL redirect user to success page
                                    self.$router.push({ name: "success" });
                                    self.errors = null;
                                    self.store.cart = [];
                                    localStorage.setItem(
                                        "cart",
                                        JSON.stringify(self.store.cart)
                                    );
                                })
                                .catch((error) => {
                                    console.log(error);
                                    if (
                                        error.response &&
                                        error.response.status === 422
                                    ) {
                                        self.errors = Object.values(
                                            error.response.data.errors
                                        ).flat();
                                    } else {
                                        console.error(error);
                                    }
                                });
                        });
                    });
                }
            );
        },
    },
    mounted() {
        // axios
        //     .get("http://127.0.0.1:8000/api/braintree/token")
        //     .then((response) => {
        //         this.clientToken = response.data.clientToken;
        //         this.initializeBrainTree();
        //     })
        //     .catch((error) => console.log(error));
    },
    created() {},
    watch: {
        showDropin: function (newValue, oldValue) {
            if (newValue) {
                this.showLoading = true;
                axios
                    .get("http://127.0.0.1:8000/api/braintree/token")
                    .then((response) => {
                        this.clientToken = response.data.clientToken;
                        this.initializeBrainTree();

                        this.showLoading = false;

                        // Show back and pay buttons

                        this.dropInLoaded = true;
                    })
                    .catch((error) => console.log(error));
            }
        },
    },
};
</script>

<template>
    <div v-if="store.cart > 0">
        <!-- LOADING -->
        <div v-if="showLoading" class="text-center my-5 py-3">
            <h1>LOADING...</h1>
        </div>

        <div v-if="errors.length" class="alert alert-danger">
            <h3>Errore form, torna indietro!</h3>
            <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
        </div>

        <form class="container my-5">
            <!-- CUSTOMER DETAILS -->
            <div v-if="!showDropin">
                <!-- NAME-->
                <div class="mb-3">
                    <label for="costumer_name" class="form-label">
                        Nome e Cognome utente<span class="text-danger"> *</span>
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="costumer_name"
                        name="costumer_name"
                        placeholder="Inserisci nome e cognome presente sul citofono dell'indirizzo di consegna.."
                        v-model="order.costumer_name"
                    />
                </div>

                <!-- DELIVERY ADDRESS -->
                <div class="mb-3">
                    <label for="delivery_address" class="form-label">
                        Indirizzo di consegna<span class="text-danger"> *</span>
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="delivery_address"
                        name="delivery_address"
                        placeholder="Inserisci l'indirizzo di consegna.."
                        v-model="order.delivery_address"
                    />
                </div>

                <!-- DELIVERY CONTACT -->
                <div class="mb-3">
                    <label for="delivery_contact" class="form-label">
                        Numero di telefono per la consegna<span
                            class="text-danger"
                        >
                            *</span
                        >
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="delivery_contact"
                        name="delivery_contact"
                        placeholder="Inserisci il numero di telefono per la consegna.."
                        v-model="order.delivery_contact"
                    />
                </div>
            </div>

            <!-- DISPLAY BRAINTREE BUTTON -->
            <button
                class="btn btn-primary"
                @click.prevent="showDropin = true"
                v-if="!showDropin"
            >
                Procedi al pagamento
            </button>
            <!-- DISPLAY BRAINTREE BUTTON -->

            <!-- braintree  START-->
            <div v-if="showDropin">
                <div id="dropin-wrapper">
                    <div id="checkout-message"></div>
                    <div id="dropin-container"></div>
                    <div v-if="dropInLoaded" class="text-center my-3">
                        <button
                            class="btn btn-secondary me-2"
                            @click.prevent="
                                (showDropin = false), (dropInLoaded = false)
                            "
                        >
                            Torna indietro
                        </button>
                        <button id="submit-button" class="btn btn-success">
                            Paga
                        </button>
                    </div>
                </div>
            </div>

            <!-- braintree  END-->
        </form>
    </div>

    <!-- IF CART IS EMPTY -->
    <div v-else class="p-5 d-flex flex-column justify-content-center align-items-center">
        <div class="my-4">
            Carrello vuoto!
        </div>
        <button @click="goBack" class="btn btn-secondary">
            Torna alla pagina precedente
        </button>
    </div>
</template>

<style lang="scss"></style>
