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

    <div class="container">
        
        <h3 class="my-bold">
            Il tuo ordine è andato a buon fine!
        </h3>
        <p class="my-green my-bold">Controlla la tue email, per tutte le informazioni sul tuo ordine</p>
        <p><strong class="my-bold">Grazie per aver scelto ComidaGo!</strong></p>
        <router-link :to="{
                        name: 'home',
                    }">
                    <button type="button" class="btn btn-danger">Home</button>
        </router-link>
    </div>

</template>

<style lang="scss">
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 50px;
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 0 20px #fc456a;

    .my-green{
        color: limegreen;
    }
    .my-bold{
        font-weight: bold;
    }
}


</style>
