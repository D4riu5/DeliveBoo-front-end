<script>
// Helpers
import Component1 from "../components/Component1.vue";
import Component2 from "../components/Component2.vue";
import Component3 from "../components/Component3.vue";
import Component4 from "../components/Component4.vue";
import { store } from "./../store";

export default {
    name: "AppHomepage",
    components: {
        Component1,
        Component2,
        Component3,
        Component4
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
    <Component1 />
    <Component2 />
    <Component3 />
    <Component4 />

</template>

<style lang="scss">

</style>
