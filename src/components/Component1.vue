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
    methods: {
        scrollToComponent2() {
            const component2Div = document.querySelector('#look4Resta');
            const headerHeight = 90;
        window.scrollTo({
            top: component2Div.offsetTop - headerHeight,
            behavior: 'smooth'
         });
        }

    }
}
</script>


<template>
    <div class="VideoContainer">
        <video autoplay muted loop>
            <source src="../video/jumbotron_compresso.mp4" type="video/mp4" />
        </video>
    </div>
    <div class="jumboTagContainer jumbotron-fluid">
        <div class="container tagStyle">
            <h2 class="text-center text-light fw-bold">
                Assapora il meglio della cucina internazionale a Milano!
            </h2>
            <h5 style="color:red;" class="text-center">
                Il nostro servizio di delivery food ti porta in tavola i
                piatti più prelibati delle cucine internazionali, <br>
                consegnati direttamente a casa tua.
            </h5>
            <div class="d-flex justify-content-center flex-column align-items-center">
                <h4 class="text-white">
                    Comincia la ricerca!
                </h4>
                <div class="btnContainer">
                    <div class="pt-3">

                        <!-- <router-link :to="{
                                name: 'cerca-ristorante',
                            }" class="text-decoration-none textStyle">
                            VAI
                        </router-link> -->
                        <div type="button" class="text-decoration-none textStyle" @click="scrollToComponent2()">
                            Vai
                        </div>

                    </div>
                </div>
            </div>
            <div class="logoBox">
                <img src="../img/standing.png" alt="">
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.VideoContainer {
    position: relative;
    width: 100%;
    height: calc(100vh - 100px);

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;

    }
}

.jumboTagContainer {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .tagStyle {
        background: rgba(0, 0, 0, 0.7294117647);
        border-radius: 445px;
        padding: 55px 46px 20px 50px;

    }

    .logoBox {
        width: 59px;
        height: 72px;
        position: absolute;
        top: 69%;
        left: 53%;

        img {
            width: 100%;
            height: 100%;
        }
    }
}

.btnContainer {
    background-color: red;
    border-radius: 45px;
    padding: 0px 13px 20px 13px;

    .textStyle {
        font-family: 'Darumadrop One', cursive !important;
        font-size: 26px;
        background: red($color: #000000);
        line-height: 20px;
        vertical-align: middle;
        color: white
    }
}
</style>
