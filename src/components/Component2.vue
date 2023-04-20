<script>
import { store } from "../store.js";
import axios from "axios";

export default {
    name: "Component2",
    components: {},
    data() {
        return {
            store,
        };
    },
    methods: {
        getTypes() {
            axios
                .get(this.store.backEndLink + "/api/types")
                .then((resp) => {
                // console.log(resp.data.types);
                    this.store.types = resp.data.types;

            });
        },
    },
    created() {
        this.getTypes();

    },
};
</script>

<template>
    <main class="container">
        <section id="header" class="jumbotron text-center">
            <h1>
                <label for="exampleDataList" class="form-label"
                    >Cerca per categoria</label
                >
            </h1>
            <!-- <div class="d-flex justify-content-center">
                <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Cerca un ristorante...">
            </div> -->
        </section>

        <section class="gallery py-4">
            <div class="container">
                <div class="row">
                    <div
                        v-for="type in store.types"
                        class="col-lg-3 mb-3 text-center"
                    >
                        <router-link
                            class="text-decoration-none text-dark"
                            :to="{
                                name: 'type-show',
                                params: { name: type.name },
                            }"
                        >
                            <div class="card">
                                <div class="card-body">
                                    <img :src="type.full_image_path" alt="" />
                                    <h5 class="card-title mt-3">
                                        {{ type.name }}
                                    </h5>
                                </div>
                            </div>
                        </router-link>
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

    img {
        width: 100%;
    }
}
</style>
