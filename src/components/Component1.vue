<script>
import { store } from "../store.js";

export default {
    name: 'Component1',
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
    <video autoplay muted loop>
        <source src="../video/jumbotron_compresso.mp4" type="video/mp4"/>
    </video>
</template>


<style lang="scss" scoped>
    video {
        width: 100%;
        height: 500px;
        object-fit: cover;
    }
</style>
