<script>
// Helpers
import { store } from "./../store";

export default {
    name: "success",
    data() {
        return {
            store,
        };
    },
    methods: {},
};
</script>

<template>
    <!-- checkout progress -->
    <div class="my-img-container">
        <div>
            <img src="./../img/checkout/Ordine  Completato.png" alt="">
        </div>
    </div>
    <!-- /checkout progress -->

    <!-- <div class="container">
        <i class="fa-regular fa-circle-check d-flex align-items-center"></i>
        <h3 class="my-bold">
            Il tuo ordine è andato a buon fine!
        </h3>
        <p class="my-green my-bold"><i class="fa-regular fa-envelope"></i> Controlla la tue email, per tutte le informazioni sul tuo ordine</p>
        <p><strong class="my-bold">Grazie per aver scelto ComidaGo!</strong></p>
        <router-link :to="{
                        name: 'home',
                    }">
                    <button type="button" class="buttonHome">Home</button>
        </router-link>
    </div> -->

    <div class="my_container">
        <i class="fa-regular fa-circle-check"></i>

        <h3>Il tuo ordine è andato a buon fine!</h3>
        <p class="email"><i class="fa-regular fa-envelope"></i> Controlla la tua email per tutte le informazioni sul tuo ordine</p>
        <p><strong>Grazie per aver scelto ComidaGo!</strong></p>

        <router-link :to="{
            name: 'home',
        }">
            <button class="buttonHome">Ritorna alla home per effettuare un altro ordine</button>
        </router-link>
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
.my_container {
    text-align: center;
    font-size: 20px;
    padding: 128px 0;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;

    .fa-circle-check {
        color: #03c03c;
        font-size: 150px;
        object-fit: contain;
        padding: 5px;
    }

    p {
        margin: 10px 0;

        .fa-envelope {
            color: #03c03c;
        }
    }

    .email {
        color: #03c03c;
    }

    .buttonHome {
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
</style>