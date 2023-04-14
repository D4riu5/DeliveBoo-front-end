<script>
import { store } from "../store.js";

// Helpers
import axios from "axios";

export default {
    name: "AppHeader",
    components: {},
    // data() {
    //     return {
    //         store,
    //         menuItems: [
    //             {
    //                 routeName: "home",
    //                 label: "Home",
    //             },
    //         ],
    //     };
    // },
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
                                <a class="nav-link" aria-current="page" href="http://127.0.0.1:8000/login">Accedi</a>
                            </li>
                            
                            <li class="nav-item">
                                <a class="nav-link" href="http://127.0.0.1:8000/register">Registrati</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <!-- <header class="p-5 container text-center text-light">
        <div class="container">
            <div class="row">
                <div class="col">
                    <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid">
                            <button
                                class="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarNav"
                                aria-controls="navbarNav"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div
                                class="collapse navbar-collapse"
                                id="navbarNav"
                            >
                                <ul
                                    class="navbar-nav d-flex w-100 justify-content-center"
                                >
                                    <li
                                        class="nav-item"
                                        v-for="menuItem in menuItems"
                                    >
                                        <router-link
                                            :to="{ name: menuItem.routeName }"
                                            class="nav-link text-danger"
                                        >
                                            {{ menuItem.label }}
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </header> -->
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
