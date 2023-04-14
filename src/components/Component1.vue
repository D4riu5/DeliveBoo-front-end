<script>
import { store } from "../store.js";

export default {
    name: 'Component1',
    components: {

    },
    data() {
        return {
            store
        }
    },
    methods:{
        
    },
}
</script>


<template>
    <main>
        <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="" class="d-block w-100" alt="Cibo 1">
                </div>
                
                <div class="carousel-item">
                    <img src="" class="d-block w-100" alt="Cibo 2">
                </div>
                
                <div class="carousel-item">
                    <img src="" class="d-block w-100" alt="Cibo 3">
                </div>
            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>

            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </main>
</template>


<style lang="scss" scoped>
    main {
        border: 2px dashed black;
        background-color: lightcyan;
        height: 400px;
    }
</style>
