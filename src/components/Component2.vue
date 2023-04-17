<script>
import { store } from "../store.js";

export default {
    name: 'Component2',
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
        <section id="header" class="jumbotron text-center">
            <h1><label for="exampleDataList" class="form-label">Cerca un ristorante</label></h1>
            <div class="d-flex justify-content-center">
                <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Cerca un ristorante...">
            </div>
        </section>

        <section class="gallery py-4">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 mb-3">
                        <div class="card">
                            <div class="img-container">
                                <img src="" alt="Image" class="image card-img-top">
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">Title Restaurant/Fast Food</h5>
                                <a href="#" class="btn btn-info text-white">Vai nella sezione</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 mb-3">
                        <div class="card">
                            <div class="img-container">
                                <img src="" alt="Image" class="image card-img-top">
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">Title Restaurant/Fast Food</h5>
                                <a href="#" class="btn btn-info text-white">Vai nella sezione</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 mb-3">
                        <div class="card">
                            <div class="img-container">
                                <img src="" alt="Image" class="image card-img-top">
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">Title Restaurant/Fast Food</h5>
                                <a href="#" class="btn btn-info text-white">Vai nella sezione</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 mb-3">
                        <div class="card">
                            <div class="img-container">
                                <img src="" alt="Image" class="image card-img-top">
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">Title Restaurant/Fast Food</h5>
                                <a href="#" class="btn btn-info text-white">Vai nella sezione</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 mb-3">
                        <div class="card">
                            <div class="img-container">
                                <img src="" alt="Image" class="image card-img-top">
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">Title Restaurant/Fast Food</h5>
                                <a href="#" class="btn btn-info text-white">Vai nella sezione</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 mb-3">
                        <div class="card">
                            <div class="img-container">
                                <img src="" alt="Image" class="image card-img-top">
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">Title Restaurant/Fast Food</h5>
                                <a href="#" class="btn btn-info text-white">Vai nella sezione</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 mb-3">
                        <div class="card">
                            <div class="img-container">
                                <img src="" alt="Image" class="image card-img-top">
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">Title Restaurant/Fast Food</h5>
                                <a href="#" class="btn btn-info text-white">Vai nella sezione</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 mb-3">
                        <div class="card">
                            <div class="img-container">
                                <img src="" alt="Image" class="image card-img-top">
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">Title Restaurant/Fast Food</h5>
                                <a href="#" class="btn btn-info text-white">Vai nella sezione</a>
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
        border: 2px dashed black;
        background-color: lightgoldenrodyellow;

        .form-control {
            width: 450px;
            border-radius: 30px 30px;
        }
    }
</style>