<script>
import { store } from "../store.js";

// Helpers
import axios from "axios";

export default {
    name: "AppHeader",
    components: {},
    data() {
        return {
            store,
        };
    },
    methods: {},
};
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg shadow-lg">
            <div class="container d-flex align-items-center">

                <div class="logo-cont">
                    <a href="http://localhost:5174/">
                        <img src="" alt="Logo">
                        Nome Logo
                    </a>
                </div>

                <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">

                    <div id="Separatore">

                    </div>

                    <div>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" :href="this.store.backEndLink + '/login'">Accedi</a>
                            </li>
                            
                            <li class="nav-item">
                                <a class="nav-link" :href="this.store.backEndLink + '/register'">Registrati</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
    header {
        border: 2px dashed black;
        background-color: lightblue;
    }

    li a:hover{
        color: #cb3234;
    }
</style>
