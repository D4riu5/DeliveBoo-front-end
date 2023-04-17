<script>
import { store } from "../store.js";

export default {
    name: 'AppFooter',
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
    <footer>
        <div class="footer-container">
            <div class="footer-section">
                <h3>Info 1</h3>
                <ul>
                    <li><a href="#">Lorem Ipsum</a></li>
                    <li><a href="#">Lorem Ipsum</a></li>
                    <li><a href="#">Lorem Ipsum</a></li>
                    <li><a href="#">Lorem Ipsum</a></li>
                    <li><a href="#">Lorem Ipsum</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Info 2</h3>
                <ul>
                    <li><a href="#">Lorem Ipsum</a></li>
                    <li><a href="#">Lorem Ipsum</a></li>
                    <li><a href="#">Lorem Ipsum</a></li>
                    <li><a href="#">Lorem Ipsum</a></li>
                    <li><a href="#">Lorem Ipsum</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Info 3</h3>
                <ul>
                    <li><a href="#">Lorem Ipsum</a></li>
                    <li><a href="#">Lorem Ipsum</a></li>
                    <li><a href="#">Lorem Ipsum</a></li>
                    <li><a href="#">Lorem Ipsum</a></li>
                    <li><a href="#">Lorem Ipsum</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom text-center">
            <p>&copy; 2023 DeliveBoo - Tutti i diritti riservati.</p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
    footer {
        background-color: lightgray;
        color: black;
        padding: 40px 0;
        border: 2px dashed black;
    }
    .footer-container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        max-width: 1200px;
        margin: 0 auto;
    }
</style>