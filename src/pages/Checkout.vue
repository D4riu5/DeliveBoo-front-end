<script>
// Helpers
import { store } from "../store";
import axios from "axios";

export default {
    name: "Checkout",
    components: {
    },
    data() {
        return {
            store,
            clientToken: "",
            nonce: "",
        };
    },
    methods: {
        initializeBrainTree() {
            const self = this;

            braintree.dropin.create(
                {
                    authorization: this.clientToken,
                    container: "#dropin-container",
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

                            self.nonce = payload.nonce;

                            axios
                                .post("/checkout", {
                                    paymentMethodNonce: self.nonce,
                                })
                                .then((response) => {
                                    if (response.data.success) {
                                        instance.teardown(function (
                                            teardownErr
                                        ) {
                                            if (teardownErr) {
                                                console.error(
                                                    "Could not tear down Drop-in UI!",
                                                    teardownErr
                                                );
                                            } else {
                                                console.info(
                                                    "Drop-in UI has been torn down!"
                                                );
                                                // Remove the 'Submit payment' button
                                                submitButton.remove();
                                                document.querySelector(
                                                    "#checkout-message"
                                                ).innerHTML =
                                                    '<h1>Success</h1><p>Your Drop-in UI is working! Check your <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> for your test transactions.</p><p>Refresh to try another transaction.</p>';
                                            }
                                        });
                                    } else {
                                        console.log(response.data);
                                        document.querySelector(
                                            "#checkout-message"
                                        ).innerHTML =
                                            "<h1>Error</h1><p>Check your console.</p>";
                                    }
                                })
                                .catch((error) => console.log(error));
                        });
                    });
                }
            );
        },
    },
    mounted() {
        axios
            .get("http://127.0.0.1:8000/api/braintree/token")
            .then((response) => {
                this.clientToken = response.data.clientToken;
                this.initializeBrainTree();
            })
            .catch((error) => console.log(error));
    },
};
</script>

<template>
    <div class="container">
        <div id="dropin-wrapper">
            <div id="checkout-message"></div>
            <div id="dropin-container"></div>
            <button id="submit-button">Submit payment</button>
        </div>
    </div>
</template>

<style lang="scss"></style>
