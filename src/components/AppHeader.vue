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
            darkTheme: false,
        };
    },
    methods: {
        switchTheme() {
            if (!this.darkTheme) {
                this.darkTheme = true;
            } else {
                this.darkTheme = false;
            }
        },
    },
};
</script>

<template>
    <header class="sticky-top p-4">
        <nav class="container d-flex justify-content-between">
            <div class="logo-cont">
                <a
                    v-if="$route.path === '/'"
                    class="text-decoration-none text-dark"
                    href="#"
                >
                    <img src="" alt="Logo" />
                    Nome Logo
                </a>
                <router-link
                    v-else
                    class="text-decoration-none text-dark"
                    :to="{
                        name: 'home',
                    }"
                >
                    <img src="" alt="Logo" />
                    Nome Logo
                </router-link>
            </div>

            <div>
                <button
                    class="btn btn-primary"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                >
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>
        </nav>
    </header>

    <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
    >
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">MENU</h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
            ></button>
        </div>
        <div class="offcanvas-body">
            <div>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            aria-current="page"
                            :href="this.store.backEndLink + '/login'"
                            ><i class="fa-solid fa-user mx-2"> </i> Area Partner
                        </a>
                    </li>
                    <li class="nav-item">
                        <div
                            v-if="darkTheme == false"
                            @click="switchTheme()"
                            id="changeTheme2"
                        >
                            <i class="fa-solid fa-sun fs-6 mx-2"></i> Light Mode
                        </div>
                        <div v-else id="changeTheme" @click="switchTheme()">
                            <i class="fa-solid fa-moon fs-6 mx-2"></i> Dark Mode
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
header {
    border: 2px dashed black;
    background-color: lightblue;
}

.offcanvas {
    width: 20%;

    li:hover {
        color: #cb3234;
    }

    #changeTheme {
        cursor: pointer;
    }
    #changeTheme2 {
        cursor: pointer;
    }
}
</style>
