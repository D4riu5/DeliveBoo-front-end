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
                status: "Consegnato",
                costumer_name: "",
                delivery_address: "",
                email_address: "",
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

        // FOR THE RESTAURANT API IN CASE OF PAGE REFRESH
        getFirstFoodRestaurantId() {
            const firstFood = this.store.cart[0];
            return firstFood ? firstFood.restaurant_id : null;
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
        const restaurantId = this.getFirstFoodRestaurantId();
        axios
            .get(`${store.backEndLink}/api/restaurants/${restaurantId}/foods`)
            .then((resp) => {
                if (resp.data.restaurant) {
                    this.store.restaurant = resp.data.restaurant;
                    // not doing anything with foods. Im getting this Api cuz i need the store.restaurant to have the current restaurant in case of page refresh that would mess-up the shopping cart
                }
            });
    },
    created() { },
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
    
    <div v-if="store.cart.length > 0">
        <!-- checkout progress -->
        <div class="my-img-container">
            <div>
                <img v-if="!showDropin" src="./../img/checkout/checkout dettagli.png" alt="">
                <img v-else src="./../img/checkout/checkout completato.png" alt="">
            </div>
        </div>
        <!-- /checkout progress -->

        <!-- LOADING -->
        <div v-if="showLoading" class="text-center my-5 py-3">
            <h1>CARICAMENTO...</h1>
        </div>

        <div v-if="errors.length" class="alert alert-danger text-center text-dark">
            <h3>Ooops! Non abbiamo potuto verificare i tuoi dati a causa di un errore</h3>
            <h2>Controlla i tuoi dati e ripova</h2>
            <ul>
                <li style="color:red" class="text-center"
                v-for="error in errors" :key="error">{{ error }}
                </li>
            </ul>
        </div>
        


        <form class="container-xxl my-container p-3">
            <div class="form-cart clickedBtnPay">
                <!-- CUSTOMER DETAILS -->
                <div v-if="!showDropin">
                    <h3 class="fontColor">Dettagli cliente</h3>
                    <!-- NAME-->
                    <div class="flex-form">
                        <div class="items">
                            <div class="items">
                                <label for="costumer_name" class="form-label">
                                    Nome e Cognome<span class="text-danger"> *</span>
                                </label>
                                <input type="text" class="form-control" id="costumer_name" name="costumer_name"
                                    placeholder="Jon Doe" v-model="order.costumer_name" />
                            </div>
                        </div>
                    </div>

                    <!-- DELIVERY ADDRESS -->
                    <div class="flex-form">
                        <div class="items">
                            <div class="items">
                                <label for="delivery_address" class="form-label">
                                    Indirizzo di consegna<span class="text-danger"> *</span>
                                </label>
                                <input type="text" class="form-control" id="delivery_address" name="delivery_address"
                                    placeholder="Via Roma, 10" v-model="order.delivery_address" />
                            </div>
                        </div>
                    </div>

                    <!-- EMAIL ADDRESS -->
                    <div class="flex-form">
                        <div class="items">
                            <label for="email_address" class="form-label">
                                Indirizzo email<span class="text-danger"> *</span>
                            </label>
                            <input type="text" class="form-control" id="email_address" name="email_address"
                                placeholder="email@example.it" v-model="order.email_address" />
                        </div>
                    </div>


                    <!-- DELIVERY CONTACT -->
                    <div class="flex-form">
                        <div class="items">
                            <label for="delivery_contact" class="form-label">
                                Recapito telefonico<span class="text-danger"> *</span>
                            </label>
                            <input type="text" class="form-control" id="delivery_contact" name="delivery_contact"
                                placeholder="Inserisci il numero di telefono per la consegna.."
                                v-model="order.delivery_contact" />
                        </div>
                    </div>
                    <!-- DISPLAY BRAINTREE BUTTON -->
                    <!-- <button
                        class="buttonPay"
                        @click.prevent="showDropin = true"
                        v-if="!showDropin"
                    >
                        Procedi al pagamento
                    </button> -->
                    <input @click.prevent="showDropin = true" type="submit" value="Procedi al pagamento" v-if="!showDropin">
                    <!-- DISPLAY BRAINTREE BUTTON -->
                </div>

                <!-- braintree  START-->
                <div v-if="showDropin">
                    <!-- <div id="dropin-wrapper">
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
                    </div> -->
                    <div class="d-flex flex-column align-items-center cervelloAlbero">
                        <div id="dropin-container" class="width-braintree"></div>
                        <div v-if="dropInLoaded" class="text-center my-3">
                            <button class="buttonBack ms-2" @click.prevent="(showDropin = false), (dropInLoaded = false)
                                ">
                                Torna indietro
                            </button>
                            <button id="submit-button" class="buttonPay mx-2">Conferma pagamento</button>
                        </div>
                    </div>
                </div>
                <!-- braintree  END-->
            </div>
        </form>
    </div>

    <!-- IF CART IS EMPTY -->
    <div v-else class="p-5 d-flex flex-column justify-content-center align-items-center">
        <div class="scrittaVuoto">Carrello vuoto!</div>
        <button @click="goBack" class="buttonIndietro">
            Torna alla pagina precedente
        </button>
    </div>
</template>

<style lang="scss" scoped>
.my-img-container{
    width: 100%;
    height: auto;
    img{
        width: 100%;
        height: auto;
    }
}

.my-container {
    gap: 25px;

    .form-cart {
        width: 75%;
        background-color: white;
        min-height: 400px;
        border-radius: 10px;
        padding: 20px 15px;
        margin: 0 auto;
        display: flex;
        justify-content: center;

        .my-text-center{
            text-align: center;
        }
        .flex-form {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;

            input {
                padding: 6px;
                width: 170%;
                border-radius: 5px;
                outline: none;
            }
        }

        input[type="submit"] {
            border: 3px solid rgba($color: #fc456a, $alpha: 0.8);
            background-color: #F9FAFA;
            border-radius: 10px;
            color: rgba($color: #000000, $alpha: 0.8);
            padding: 3px 10px;

            &:hover {
                background-color: rgba($color: #fc456a, $alpha: 0.8);
                color: rgb(0, 0, 0);
            }
        }
    }

    .width-braintree {
        width: 650px;
    }

    .buttonBack,
    .buttonPay {
        border: 3px solid rgba($color: #fc456a, $alpha: 0.8);
        background-color: #F9FAFA;
        border-radius: 10px;
        color: rgba($color: #000000, $alpha: 0.8);
        padding: 3px 10px;

        &:hover {
            background-color: rgba($color: #fc456a, $alpha: 0.8);
            color: rgb(0, 0, 0);
        }
    }
}

.scrittaVuoto {
    font-size: 50px;
    color: #ffa500;
}

.buttonIndietro {
    border: 3px solid rgba($color: #fc456a, $alpha: 0.8);
    background-color: #F9FAFA;
    border-radius: 10px;
    color: rgba($color: #000000, $alpha: 0.8);
    padding: 3px 10px;

    &:hover {
        background-color: rgba($color: #fc456a, $alpha: 0.8);
        color: rgb(0, 0, 0);
    }
}

.fontColor {
    color: #fc456a;
    font-family: 'Comfortaa', cursive;
}
</style>
