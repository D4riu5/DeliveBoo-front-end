<script>
// Helpers
import { store } from "./../store";

export default {
    name: "AppHomepage",
    data() {
        return {
            store,
        };
    },
    methods: {},
};
</script>

<template>
    <div>Ciao from Homepage</div>
    <div>
        <a :href="this.store.backEndLink + '/login'"> VAi su login </a>
    </div>

    <div>
        <a :href="this.store.backEndLink + '/register'"> Vai su register </a>
    </div>


</template>

<style lang="scss">

</style>
