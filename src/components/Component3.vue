<script>
import { store } from "../store.js";

export default {
    name: "Component3",
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
    <main>
        <div class="restaurantBar text-center container-fluid">
            <p class="">Come funziona</p>
        </div>


        <div class="d-flex flex-row justify-content-center my-5">
            <div class="carousel-container my-2">
                <swiper-container
                    class="mySwiper swiper-container"
                    pagination="true"
                    effect="cube"
                    grab-cursor="true"
                    cube-effect-shadow="true"
                    cube-effect-slide-shadows="true"
                    cube-effect-shadow-offset="20"
                    cube-effect-shadow-scale="1.04"
                    navigation="true"
                    style="
                        --swiper-navigation-color: red;
                        --swiper-pagination-color: red;
                    "
                >
                    <swiper-slide>
                        <img src="./../img/step_1b.jpg" />
                    </swiper-slide>
                    <swiper-slide>
                        <img src="./../img/step_2b.jpg" />
                    </swiper-slide>
                    <swiper-slide>
                        <img src="./../img/step_3b.jpg" />
                    </swiper-slide>
                </swiper-container>
            </div>

            <div class="carousel-container2 my-2">
                <swiper-container
                    class="mySwiper swiper-container"
                    pagination="true"
                    effect="cube"
                    grab-cursor="true"
                    cube-effect-shadow="true"
                    cube-effect-slide-shadows="true"
                    cube-effect-shadow-offset="20"
                    cube-effect-shadow-scale="1.04"
                    
                    navigation="true"
                    style="
                        --swiper-navigation-color: red;
                        --swiper-pagination-color: red;
                    "
                >
                    <swiper-slide>
                        <img src="./../img/step_4b.jpg" />
                    </swiper-slide>
                    <swiper-slide>
                        <img src="./../img/step_5b.jpg" />
                    </swiper-slide>
                    <swiper-slide>
                        <img src="./../img/step_6b.jpg" />
                    </swiper-slide>
                </swiper-container>
            </div>
        </div>

        <!-- <section class="gallery py-4">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 mb-3">
                        <div class="card border-danger">
                            <div class="img-container d-flex justify-content-center p-2">
                                <img src="./../img/3.png" alt="Image" class="image card-img-top">
                            </div>

                            <div class="card-body">
                                <h5 class="card-title text-center"><strong>You choose</strong></h5>
                                <p class="card-text text-center">Scopri la vasta scelta di piatti del nostro ristorante. 
                                    Scegli tra le nostre delizie italiane, hamburger succulenti, cucina giapponese e molto altro ancora.
                                    Personalizza il tuo ordine in base alle tue preferenze e gusti.
                                    Dai un'occhiata al nostro menu e scegli il tuo piatto preferito oggi stesso!</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 mb-3">
                        <div class="card border-danger">
                            <div class="img-container d-flex justify-content-center p-2">
                                <img src="./../img/4.png" alt="Image" class="image card-img-top">
                            </div>

                            <div class="card-body">
                                <h5 class="card-title text-center"><strong>We deliver</strong></h5>
                                <p class="card-text text-center">Ordinare il cibo dal nostro ristorante non è mai stato così facile.
                                    Basta pochi click per ordinare dal nostro sito web e ricevere il tuo cibo direttamente a casa tua.
                                    La nostra consegna è affidabile e puntuale, garantendo che il tuo cibo arrivi caldo e pronto da gustare.
                                    Consegna rapida e affidabile - questo è il nostro impegno per te</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 mb-3">
                        <div class="card border-danger">
                            <div class="img-container d-flex justify-content-center p-2">
                                <img src="./../img/5.png" alt="Image" class="image card-img-top">
                            </div>

                            <div class="card-body">
                                <h5 class="card-title text-center"><strong>Eat, Enjoy & Repeat</strong></h5>
                                <p class="card-text text-center">Il nostro cibo è un'esperienza per il tuo palato.
                                    Ogni piatto è preparato con ingredienti freschi e di alta qualità, per garantirti il massimo gusto e sapore.
                                    Assapora i sapori unici delle nostre ricette.
                                    Ordina dal nostro sito di delivery e gustati ogni boccone - ti garantiamo che tornerai a ordinare da noi ancora e ancora.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
    </main>
</template>

<style lang="scss" scoped>
main {
    // img {
    //     width: 200px;
    //     height: 200px;
    // }

    .card {
        height: 445px;

        &:hover {
            transform: scale(1.1);
            transition: 0.3s ease;
        }
    }

    h5 {
        color: rgba($color: #fc456a, $alpha: 0.8);
    }

    p {
        color: #676868;
    }
}

.restaurantBar {
    border-top: 1px solid lightgray;

    p {
        margin-top: 8px;
        padding-top: 12px;
        font-size: 35px;
        color: #ff3f5c;
        font-family: "Comfortaa", cursive;
        vertical-align: middle;
    }
}

.carousel-container,
.carousel-container2 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.swiper-container {
    width: 350px;
    margin: 0 80px; /* add some margin between the two containers */
}

.swiper-slide img {
    max-width: 100%;
}

</style>
