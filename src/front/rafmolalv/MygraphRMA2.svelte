<script>
    import { onMount } from "svelte";
    import Button from 'sveltestrap/src/Button.svelte';
    //import Highcharts from "highcharts";
    const delay = ms => new Promise(res => setTimeout(res,ms));

    //repeaters-stats
    let repeatersStats = [];
    let r_country = [];
    let r_women = [];
    let r_men = [];
    let r_average = [];
 
    let apiData = [];


    async function getRepeatersStats() {
        console.log("Fetching stats....");
        const res = await fetch("/api/v2/repeaters-stats");
        if (res.ok) {
            const data = await res.json();
            repeatersStats = data;
            console.log("Estadísticas recibidas: " + repeatersStats.length);
            //inicializamos los arrays para mostrar los datos
            repeatersStats.forEach((stat) => {
                r_country.push(stat.country + "-" + stat.year);
                r_women.push(stat["women"]);
                r_men.push(stat["men"]);
                r_average.push(stat["average"]);
            });
            await delay(500);
            loadGraph();

        } else {
            console.log("Error cargando los datos");
        }
    }

    async function loadGraph() {
        let apiDataA = apiData.map((i) => {
            return i.average;
        });
        let apiDataY = apiData.map((i) => {
            return [i.year, i.country];
        });
        Highcharts.chart("container", {
            chart: {
                 type: 'areaspline'
            },
            title: {
                text: "Repeaters Stats",
            },


            yAxis: {
                title: {
                    text: "Valor",
                },
            },

            xAxis: {
                type: 'País-Año',
                categories: r_country
            },

            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false,
                    },
                },
            },

            series: [
              
                {
                    name: "Mujeres",
                    data: r_women,
                },
                {
                    name: "Hombres",
                    data: r_men,
                },
                {
                    name: "Media",
                    data: r_average,
                }
            ],

            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500,
                        },
                        chartOptions: {
                            legend: {
                                layout: "horizontal",
                                align: "center",
                                verticalAlign: "bottom",
                            },
                        },
                    },
                ],
            },
        });
    }
    onMount(getRepeatersStats);

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>  
    <script
        src="https://code.highcharts.com/modules/accessibility.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
            En la siguiente gráfica se muestra la relación que existe entre el tiempo
             dedicado al trabajo doméstico, repetidores de primaria y la tasa de finalización de primaria globales.
        </p>
        <Button color="outline-dark" on:click={function (){window.history.back()}}>Volver</Button>

    </figure>
</main>
