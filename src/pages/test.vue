<script>
// Helpers
import { store } from "../store";
import axios from "axios";

export default {
  name: "test",
  components: {},
  data() {
    return {
      store,
      post: {
        costumer_name: '',
        delivery_address: '',
        delivery_contact: '',
      }
    };
  },
  methods: {

    submitForm() {
      axios
        .post(this.store.backEndLink + `/api/order`, {
            post: this.post
        })
        .then((response) => {
          console.log(response);
          // costumer_name: this.costume_name,
          // delivery_address: this.delivery_address,
          // delivery_contact: this.delivery_contact,
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
  },
  created() {
  },
};
</script>

<template>
  <div class="container">
    <form @submit.prevent="submitForm()">
      <div class="mb-3">
        <!-- Nome utente -->
        <label for="costumer_name" class="form-label">
          Nome e Cognome utente<span class="text-danger"> *</span>
        </label>
        <input type="text" class="form-control" id="costumer_name" name="costumer_name"
          placeholder="Inserisci cognome presente sul citofono dell'indirizzo di consegna.."
          v-model="post.costumer_name"/>
      </div>
      <div class="mb-3">
        <!-- Nome utente -->
        <label for="delivery_address" class="form-label">
          Indirizzo di consegna:<span class="text-danger"> *</span>
        </label>
        <input type="text" class="form-control" id="delivery_address" name="delivery_address"
          placeholder="Inserisci l'indirizzo di consegna.."
          v-model="post.delivery_address"/>
      </div>
      <!-- contatto utente  -->
      <div class="mb-3">
        <!-- Nome utente -->
        <label for="delivery_contact" class="form-label">
          Recapito telefonico:<span class="text-danger"> *</span>
        </label>
        <input type="text" class="form-control" id="delivery_contact" name="delivery_contact"
          placeholder="Inserisci recapito telefonico, ti contatteremo in caso di necessità.."
          v-model="post.delivery_contact"/>
      </div>
      <div>
        <p><strong class="text-danger">*</strong> Campi obbligatori!</p>
      </div>
      <div>
        <button type="submit" class="btn btn-warning mt-2 mb-3">Aggiorna</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss"></style>
