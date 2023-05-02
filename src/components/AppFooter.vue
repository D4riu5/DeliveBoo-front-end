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
    methods: {

    },
}
</script>

<template>
    <footer>
        <div class="footer-container container-xxl">
            <div class="footer-section">
                <div>
                    <strong>
                        Servizio Clienti
                    </strong>
                </div>
                <ul class="d-flex flex-column">
                    <li><a class="linkColor" href="#">Accedi</a></li>
                    <li><a class="linkColor" href="#">Domande frequenti</a></li>
                    <li><a class="linkColor" href="#">Registrati</a></li>
                    <li><a class="linkColor" href="#">Miglior prezzo</a></li>
                    <li><a class="linkColor" href="#">Scarica l'app</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <div>
                    <strong>
                        Cucine
                    </strong>
                </div>
                <ul>
                    <li><a class="linkColor" href="#">Italiana</a></li>
                    <li><a class="linkColor" href="#">Messicana</a></li>
                    <li><a class="linkColor" href="#">Giapponese</a></li>
                    <li><a class="linkColor" href="#">Cinese</a></li>
                    <li><a class="linkColor" href="#">Vegetariana</a></li>
                    <li><a class="linkColor" href="#">Americana</a></li>
                    <li><a class="linkColor" href="#">Araba</a></li>
                    <li><a class="linkColor" href="#">Coreana</a></li>
                    <li><a class="linkColor" href="#">Francese</a></li>
                    <li><a class="linkColor" href="#">Greco</a></li>
                    <li><a class="linkColor" href="#">Hamburger</a></li>
                    <li><a class="linkColor" href="#">Indiana</a></li>
                    <li><a class="linkColor" href="#">Kebab</a></li>
                    <li><a class="linkColor" href="#">Peruviana</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <div>
                    <strong>
                        Catene
                    </strong>
                </div>
                <ul class="d-flex flex-column">
                    <li><a class="linkColor" href="http://localhost:5174/Attivita1">El Baffo Criminal</a></li>
                    <li><a class="linkColor" href="http://localhost:5174/Attivita5">Chupitòn</a></li>
                    <li><a class="linkColor" href="http://localhost:5174/Attivita10">Katsuya</a></li>
                    <li><a class="linkColor" href="http://localhost:5174/Attivita11">Skylin</a></li>
                    <li><a class="linkColor" href="http://localhost:5174/Attivita21">GreenGyros</a></li>
                    <li><a class="linkColor" href="http://localhost:5174/Attivita3">Il Mulino New York</a></li>
                    <li><a class="linkColor" href="http://localhost:5174/Attivita16">Aladdin's Eatery</a></li>
                    <li><a class="linkColor" href="http://localhost:5174/Attivita18">Oseyo</a></li>
                    <li><a class="linkColor" href="http://localhost:5174/Attivita20">Le Bernardin</a></li>
                    <li><a class="linkColor" href="http://localhost:5174/Attivita22">Erythraia</a></li>
                    <li><a class="linkColor" href="http://localhost:5174/Attivita14">Hustler Pub</a></li>
                    <li><a class="linkColor" href="http://localhost:5174/Attivita24">Rajehsh</a></li>
                    <li><a class="linkColor" href="http://localhost:5174/Attivita15">Kebab da Frank</a></li>
                    <li><a class="linkColor" href="http://localhost:5174/Attivita29">El Chorrillano</a></li>
                </ul>
            </div>

            <div class="footer-section chiSiamo">
                <div>
                    <strong>
                        Chi siamo
                    </strong>
                </div>
                <ul>
                    <li><a class="linkColor" href="#">Modello Business</a></li>
                    <li><a class="linkColor" href="#">Diventa partner</a></li>
                    <li><a class="linkColor" href="#">Lavora con noi</a></li>
                    <li><a class="linkColor" href="#">Norme privacy</a></li>
                    <li><a class="linkColor" href="#">Termini e condizioni</a></li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom text-center pt-5">
            <p>&copy; 2023 DeliveBoo - Tutti i diritti riservati.</p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
footer {
    background-color: black;
    color: #ffa500;
    padding: 40px 0;
}

.footer-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-section {
    div {
        font-size: 18px;
        color: #ffa500;

    }

    ul {
        text-align: start;
        padding-left: 0.2rem;

        li {
            list-style: none;
            padding-bottom: 8px;

            a {
                text-decoration: none;
                color: white;
            }
        }
    }
}



.linkColor {
    color: white;
}

.linkColor:hover {
    color: #fc456a;
}

@media screen and (min-width: 706px) and (max-width: 768px) {
    .linkColor {
        color: white;
        font-size: 20px;
    }

    .linkColor:hover {
        color: #fc456a;
    }


    .footer-section {
        div {
            font-size: 21px;
            color: #ffa500;
            padding-bottom: 5px;

        }

        ul {
            text-align: start;
            padding-left: 0.2rem;

            li {
                list-style: none;
                padding-bottom: 8px;

                a {
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }
}

.chiSiamo {
    position: absolute !important;
    top: 46%;

    div {
        font-size: 19px;
        color: #ffa500;
        padding-bottom: 5px;
    }

    ul {
        text-align: start;
        padding-left: 0.2rem;

        li {
            list-style: none;
            padding-bottom: 8px;

            a {
                text-decoration: none;
                color: white;
            }
        }
    }
}


@media screen and (min-width: 570px) and (max-width: 706px) {
    .linkColor {
        color: white;
        font-size: 20px;
    }

    .linkColor:hover {
        color: #fc456a;
    }


    .footer-section {
        div {
            font-size: 21px;
            color: #ffa500;
            padding-bottom: 5px;

        }

        ul {
            text-align: start;
            padding-left: 0.2rem;

            li {
                list-style: none;
                padding-bottom: 8px;

                a {
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }

    .chiSiamo {
        position: absolute !important;
        top: 41%;

        div {
            font-size: 21px;
            color: #ffa500;
            padding-bottom: 5px;
        }

        ul {
            text-align: start;
            padding-left: 0.2rem;

            li {
                list-style: none;
                padding-bottom: 8px;

                a {
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }

}


@media screen and (min-width: 510px) and (max-width: 570px) {
    .linkColor {
        color: white;
        font-size: 16px;
    }

    .linkColor:hover {
        color: #fc456a;
    }


    .footer-section {
        div {
            font-size: 17px;
            color: #ffa500;
            padding-bottom: 5px;

        }

        ul {
            text-align: start;
            padding-left: 0.2rem;

            li {
                list-style: none;
                padding-bottom: 8px;

                a {
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }

    .chiSiamo {
        position: absolute !important;
        top: 41%;

        div {
            font-size: 17px;
            color: #ffa500;
            padding-bottom: 5px;
        }

        ul {
            text-align: start;
            padding-left: 0.2rem;

            li {
                list-style: none;
                padding-bottom: 8px;

                a {
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }
}

@media screen and (min-width: 420px) and (max-width: 510px) {
    .linkColor {
        color: white;
        font-size: 11px;
    }

    .linkColor:hover {
        color: #fc456a;
    }


    .footer-section {
        div {
            font-size: 13px;
            color: #ffa500;
            padding-bottom: 5px;

        }

        ul {
            text-align: start;
            padding-left: 0.2rem;

            li {
                list-style: none;
                padding-bottom: 8px;

                a {
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }

    .chiSiamo {
        position: absolute !important;
        top: 41%;

        div {
            font-size: 14px;
            color: #ffa500;
            padding-bottom: 5px;
        }

        ul {
            text-align: start;
            padding-left: 0.2rem;

            li {
                list-style: none;
                padding-bottom: 8px;

                a {
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }
}

@media screen and (min-width: 320px) and (max-width: 420px) {
    .linkColor {
        color: white;
        font-size: 10px;
    }

    .linkColor:hover {
        color: #fc456a;
    }


    .footer-section {
        div {
            font-size: 14px;
            color: #ffa500;
            padding-bottom: 5px;

        }

        ul {
            text-align: start;
            padding-left: 0.2rem;

            li {
                list-style: none;
                padding-bottom: 8px;

                a {
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }

    .chiSiamo {
        position: absolute !important;
        top: 41%;

        div {
            font-size: 13px;
            color: #ffa500;
            padding-bottom: 5px;
        }

        ul {
            text-align: start;
            padding-left: 0.2rem;

            li {
                list-style: none;
                padding-bottom: 8px;

                a {
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }
}

@media screen and (max-width: 320px) {
    .linkColor {
        color: white;
        font-size: 10px;
    }

    .linkColor:hover {
        color: #fc456a;
    }


    .footer-section {
        div {
            font-size: 11px;
            color: #ffa500;
            padding-bottom: 5px;

        }

        ul {
            text-align: start;
            padding-left: 0.2rem;

            li {
                list-style: none;
                padding-bottom: 8px;

                a {
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }

    .chiSiamo {
        position: absolute !important;
        top: 41%;

        div {
            font-size: 11px;
            color: #ffa500;
            padding-bottom: 5px;
        }

        ul {
            text-align: start;
            padding-left: 0.2rem;

            li {
                list-style: none;
                padding-bottom: 8px;

                a {
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }
}
</style>