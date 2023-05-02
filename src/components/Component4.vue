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
    <main class="pb-5">
        <div class="restaurantBar text-center container-fluid">
            <p class="">I nostri sponsor</p>
        </div>
        <swiper-container class="mySwiper" slides-per-view="5" space-between="30" free-mode="true" :autoplay="{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        }" speed="5000" loop="true">
            <swiper-slide class="swiper-slide">
                <!-- burger king -->
                <img class="icon" src="./../img/SPONSORS/4.png" />
            </swiper-slide>
            <swiper-slide class="swiper-slide">
                <!-- mac -->
                <img class="icon" src="./../img/SPONSORS/2.png" />
            </swiper-slide>
            <swiper-slide class="swiper-slide">
                <!-- OPEN -->
                <img class="icon" src="./../img/SPONSORS/3.png" />
            </swiper-slide>
            <swiper-slide class="swiper-slide">
                <!-- ac Milan -->
                <img class="icon" src="./../img/SPONSORS/1.png" />
            </swiper-slide>
            <swiper-slide class="swiper-slide">
                <!-- OPEN -->
                <img class="icon" src="./../img/SPONSORS/5.png" />
            </swiper-slide>
            <swiper-slide class="swiper-slide">
                <!-- OPEN -->
                <img class="icon" src="./../img/SPONSORS/6.png" />
            </swiper-slide>
            <swiper-slide class="swiper-slide">
                <!-- Neymar -->
                <img class="icon" src="./../img/SPONSORS/7.png" />
            </swiper-slide>
            <swiper-slide class="swiper-slide">
                <!-- OPEN -->
                <img class="icon" src="./../img/SPONSORS/8.png" />
            </swiper-slide>
            <swiper-slide class="swiper-slide">
                <!-- OPEN -->
                <img class="icon" src="./../img/SPONSORS/9.png" />
            </swiper-slide>
            <swiper-slide class="swiper-slide">
                <!-- OPEN -->
                <img class="icon" src="./../img/SPONSORS/10.png" />
            </swiper-slide>
        </swiper-container>
    </main>
</template>

<style lang="scss" scoped>
.restaurantBar {
    border-top: 1px solid lightgray;

    p {
        margin-top: 8px;
        padding-top: 12px;
        font-size: 45px;
        color: black;
        font-family: "Comfortaa", cursive;
        vertical-align: middle;
    }
}

main {
    position: relative;
    height: 100%;
    background: #fff;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #000;
    margin: 0;
    padding: 0;
}

.mySwiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;

    .icon {
        width: 60%;
        aspect-ratio: 1/1;
        object-fit: contain;
    }
}

@media screen and (min-width: 320px) and (max-width: 768px) {

    .restaurantBar {
        border-top: 1px solid lightgray;

        p {
            margin-top: 8px;
            padding-top: 12px;
            font-size: 30px;
            color: black;
            font-family: "Comfortaa", cursive;
            vertical-align: middle;
        }
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;

        .icon {
            width: 100%;
            aspect-ratio: 1/1;
            object-fit: contain;
        }
    }
}
</style>
