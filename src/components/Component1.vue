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
    <!-- Contenitore principale relative -->
    <div class="JumbotronContainer">
        <div class="VideoContainer">
            <video autoplay muted loop>
                <source src="../video/jumbotron2.mp4" type="video/mp4" />
            </video>
        </div>
        <!-- LAYOVER SUL VIDEO -->
        <div class="layover"></div>
        <!-- Contenitore SCRITTA PRINCIAPLE -> MILANO  -->
        <div class="absoluteContainer container-fluid">
            <div class="d-flex flex-column align-content-center">
                <div class="titleContainer">
                    <h1 class="text-center text-light fw-bold">
                        Assapora il meglio della cucina internazionale a Milano!
                    </h1>
                </div>
                <!-- Contenitore SCRITTA SECONDARIA -->
                <div class="subtitleContainer">
                    <h5 class="text-center subtitleText">
                        Il nostro servizio di delivery food porta in tavola i
                        piatti più prelibati
                        delle cucine internazionali,
                        direttamente a casa tua.
                    </h5>
                </div>
                <div class="disclaimerContainer d-flex justify-content-center mt-3">
                    <div class="text-white">
                        <h2 class="text-center disclaimerText" @click="scrollToComponent2()">
                            Comincia la ricerca!
                        </h2>
                    </div>
                </div>
            </div>
            <!-- Contenitore "COMINCIA LA RICERCA!" -->

        </div>

        <!-- Contenitore Immagine Pizza standing  -->
        <!-- <div class="logoBox">
            <img src="../img/standing.png" alt="">
        </div> -->
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

.JumbotronContainer {
    position: relative;

    .layover {
        position: absolute;
        background: rgb(0 0 0 / 45%);
        width: 100%;
        height: 100%;
        z-index: 2;
        top: 0%;
        left: 0%;
    }

    .titleContainer {
        z-index: 3;

        h1 {
            font-size: 30px;
            font-family: 'Comfortaa', cursive;
            
        }
    }

    .subtitleContainer {
        z-index: 3;

        .subtitleText {
            color: white;
            
        }
    }

    .disclaimerContainer {
        z-index: 3;

        .disclaimerText {
            display: block;
            background: rgb(0, 0, 0);
            width: 100%;
            padding: 19px 70px;
            border-radius: 36px;

            .disclaimerText:hover {
                color: red;
            }
        }

    }

    // .btnContainer {
    //     top: 46.7%;
    //     left: 12.7%;
    //     position: absolute;
    //     z-index: 3;
    //     transform: translate(-50%, -50%);



    //     .bottone {
    //         width: 9px;
    //         height: 10px;
    //         color: white;
    //         background-color: red;
    //         border-radius: 50px;
    //         padding: 28px;

    //         .buttonText {
    //             position: absolute;
    //             top: 38%;
    //             bottom: 50%;
    //             transform: translate(-50%, -50%);
    //             font-weight: bold;
    //         }
    //     }

    // }

    // .logoBox {
    //     top: 58.5%;
    //     left: 56.5%;
    //     position: absolute;
    //     width: 76px;
    //     height: 96px;
    //     z-index: 5;
    // }


    // img {
    //     width: 100%;
    //     height: 100%;
    // }


}

.absoluteContainer {
    position: absolute;
    top: 38%;
    left: 0%;
    z-index: 4;
}
</style>
