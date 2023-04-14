<script>
// components
import AppHeader from "./components/AppHeader.vue";
import Component1 from "./components/Component1.vue";
import Component2 from "./components/Component2.vue";
import AppFooter from "./components/AppFooter.vue";
import { store } from "./store.js";

export default {
    name: "App",
    components: {
        AppHeader,
        Component1,
        Component2,
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
    <AppHeader />
    <Component1 />
    <Component2 />
    <AppFooter />
</template>

<style lang="scss">
@use "./styles/main";
</style>
