<script>
import { store } from "../store.js";

export default {
    name: 'Component3',
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
    <main class="container">
        <section id="header" class="py-3 text-center">
            <h1>Come Comida GO lavora</h1>
        </section>

        <section class="gallery py-4">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 mb-3">
                        <div class="card border-danger">
                            <div class="img-container d-flex justify-content-center p-2">
                                <img src="./../img/3.png" alt="Image" class="image card-img-top">
                            </div>

                            <div class="card-body">
                                <h5 class="card-title text-center">You choose</h5>
                                <p class="card-text text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae labore voluptas dolorum ipsa sunt explicabo?</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 mb-3">
                        <div class="card border-danger">
                            <div class="img-container d-flex justify-content-center p-2">
                                <img src="./../img/4.png" alt="Image" class="image card-img-top">
                            </div>

                            <div class="card-body">
                                <h5 class="card-title text-center">We deliver</h5>
                                <p class="card-text text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa deserunt repellendus sapiente aperiam excepturi optio!</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 mb-3">
                        <div class="card border-danger">
                            <div class="img-container d-flex justify-content-center p-2">
                                <img src="./../img/5.png" alt="Image" class="image card-img-top">
                            </div>

                            <div class="card-body">
                                <h5 class="card-title text-center">Eat, Enjoy & Repeat</h5>
                                <p class="card-text text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia possimus ipsa praesentium dicta architecto pariatur.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style lang="scss" scoped>
    main {
        background-color: lightgreen;
        border: 2px dashed black;

        h1 {
            color: rgb(252, 69, 106);
        }

        img {
            width: 50%;
            height: 50%;  
        }

        .card:hover {
            transform: scale(1.1);
            transition: 0.3s ease;
        }
    }
</style>