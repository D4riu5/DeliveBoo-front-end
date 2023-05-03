<script>
export default {
    name: 'NotFound',
    data() {
        return {
        };
    },
    mounted() {
        this.$nextTick(() => {
            // scroll to top
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    },
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h2 class="title">
                    Chi siamo
                </h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p class="description text-dark">
                    Benvenuti in Comida Go, il vostro sito di consegna preferito per cibo e bevande! Siamo appassionati di
                    consegnare pasti e bevande deliziose direttamente alla vostra porta, in modo rapido e affidabile. Che
                    siate alla ricerca di un pranzo soddisfacente, di una cena romantica per due, o di una bevanda
                    rinfrescante per dissetarvi, noi siamo qui per soddisfare le vostre esigenze. La nostra missione è
                    fornire un servizio di consegna eccezionale che renda la vostra vita più facile e piacevole. Continuate
                    a leggere per saperne di più su chi siamo e cosa rappresentiamo!
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h2 class="title">
                    La nostra storia
                </h2>
                <p class="description text-dark">
                    Comida Go è stata fondata con una visione: quella di creare un servizio di consegna che fosse veloce,
                    affidabile e di alta qualità. Partiti con una piccola squadra di appassionati di cibo e bevande, abbiamo
                    lavorato sodo per costruire una rete di ristoranti e bar di qualità che possiamo offrire ai nostri
                    clienti. Nel corso degli anni, abbiamo ampliato il nostro servizio e guadagnato la fiducia dei nostri
                    clienti, diventando un punto di riferimento per la consegna di cibo e bevande di alta qualità. Oggi,
                    continuiamo a crescere e migliorare, ma la nostra passione per il cibo e la soddisfazione del cliente
                    rimane al centro di tutto ciò che facciamo.
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h2 class="title">
                    La nostra missione
                </h2>
                <p class="description text-dark">
                    In Comida Go, la nostra missione è offrire ai nostri clienti un'esperienza di consegna di cibo e bevande
                    eccezionale. Ci impegniamo a fornire un servizio veloce e affidabile, insieme a cibo e bevande di alta
                    qualità, che possano soddisfare i vostri desideri e le vostre esigenze. Siamo orgogliosi di servire la
                    nostra comunità, e ci impegniamo a essere un'azienda responsabile e sostenibile. La nostra visione è
                    diventare il vostro servizio di consegna preferito, un nome che sia sinonimo di qualità, affidabilità e
                    soddisfazione del cliente. Siamo sempre pronti ad ascoltare i vostri commenti e le vostre idee, e siamo
                    grati per l'opportunità di servirvi.
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// Variables
$primary-color: #ff0048;
$secondary-color: #333;
$background-color: #fff;

// Container styles
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 0;

    // Heading styles
    h2 {
        font-size: 36px;
        font-weight: bold;
        color: $primary-color;
        margin-bottom: 20px;
        text-align: center;
        text-transform: uppercase;
        font-family: 'Comfortaa', cursive;
    }

    // Paragraph styles
    p {
        font-size: 18px;
        line-height: 1.5;
        color: $background-color;
        text-align: center;
        margin-bottom: 40px;
    }

    // History section styles
    .history-section {
        background-color: $background-color;
        padding: 50px;

        // Heading styles
        h2 {
            margin-bottom: 40px;
        }

        // Paragraph styles
        p {
            margin-bottom: 20px;
        }
    }

    // Mission section styles
    .mission-section {
        padding: 50px;

        // Heading styles
        h2 {
            margin-bottom: 40px;
        }

        // Paragraph styles
        p {
            margin-bottom: 20px;
        }

        // Mission statement styles
        .mission-statement {
            background-color: $primary-color;
            color: $background-color;
            padding: 20px;
            font-weight: bold;
            text-align: center;
        }
    }
}
</style>