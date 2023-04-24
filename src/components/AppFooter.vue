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
                <h5>
                    <strong>
                        Servizio Clienti
                    </strong>
                </h5>
                <ul class="d-flex flex-column">
                    <li><a href="#">Domande frequenti</a></li>
                    <li><a href="#">Accedi</a></li>
                    <li><a href="#">Registrati su Comida Go</a></li>
                    <li><a href="#">Miglior Prezzo Garantito</a></li>
                    <li><a href="#">Scarica l'app di Comida Go</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h5>
                    <strong>
                        Cucine
                    </strong>
                </h5>
                <ul>
                    <li><a href="#">Italiana</a></li>
                    <li><a href="#">Messicana</a></li>
                    <li><a href="#">Giapponese</a></li>
                    <li><a href="#">Cinese</a></li>
                    <li><a href="#">Vegetariana</a></li>
                    <li><a href="#">Americana</a></li>
                    <li><a href="#">Araba</a></li>
                    <li><a href="#">Coreana</a></li>
                    <li><a href="#">Francese</a></li>
                    <li><a href="#">Greco</a></li>
                    <li><a href="#">Hamburger</a></li>
                    <li><a href="#">Indiana</a></li>
                    <li><a href="#">Kebab</a></li>
                    <li><a href="#">Peruviana</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h5>
                    <strong>
                        Catene
                    </strong>
                </h5>
                <ul class="d-flex flex-column">
                    <li><a href="http://localhost:5174/Attivita1">El Baffo Criminal</a></li>
                    <li><a href="http://localhost:5174/Attivita5">Chupitòn</a></li>
                    <li><a href="http://localhost:5174/Attivita10">Katsuya</a></li>
                    <li><a href="http://localhost:5174/Attivita11">Skylin</a></li>
                    <li><a href="http://localhost:5174/Attivita21">GreenGyros</a></li>
                    <li><a href="http://localhost:5174/Attivita3">Il Mulino New York</a></li>
                    <li><a href="http://localhost:5174/Attivita16">Aladdin s Eatery</a></li>
                    <li><a href="http://localhost:5174/Attivita18">Oseyo</a></li>
                    <li><a href="http://localhost:5174/Attivita20">Le Bernardin</a></li>
                    <li><a href="http://localhost:5174/Attivita22">Erythraia</a></li>
                    <li><a href="http://localhost:5174/Attivita14">Hustler Pub</a></li>
                    <li><a href="http://localhost:5174/Attivita24">Rajehsh</a></li>
                    <li><a href="http://localhost:5174/Attivita15">Kebab da Frank</a></li>
                    <li><a href="http://localhost:5174/Attivita29">El Chorrillano</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h5>
                    <strong>
                        Chi siamo
                    </strong>
                </h5>
                <ul>
                    <li><a href="#">Informazioni su Comida Go</a></li>
                    <li><a href="#">Diventapartner di Comida Go</a></li>
                    <li><a href="#">Lavora con noi</a></li>
                    <li><a href="#">Informativa sulla privacy</a></li>
                    <li><a href="#">Termini e condizioni</a></li>
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
        background-color: #E2E6E9;
        color: black;
        padding: 40px 0;
    }
    .footer-container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        max-width: 1200px;
        margin: 0 auto;
    }

    .footer-section{
        
        
        h5{
            color: #333333;
        }
        ul{
            text-align: start;
            padding-left: 0.2rem;
            
            li{
                list-style: none;
                padding-bottom: 8px;

                a{
                    text-decoration: none;
                    color: black;
                }
            }
        }
    }
</style>