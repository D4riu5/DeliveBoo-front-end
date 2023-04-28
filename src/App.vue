<script>
// components
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { store } from "./store.js";

export default {
    name: "App",
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {
            store,
        };
    },
    methods: {},
};
</script>

<template>
    <div class="headerContainer">
        <AppHeader />
    </div>
    <div>
        <router-view></router-view>
    </div>
    <AppFooter />
</template>

<style lang="scss">
@use "./styles/main";
.headerContainer {
    height: 100px;
}
</style>
