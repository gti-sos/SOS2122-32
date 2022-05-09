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
        //ending-stats
    let endingStats = [];
    let e_country = [];
    let e_women = [];
    let e_men = [];
    let e_average = [];
    //

    async function getEndingStats() {
        console.log("Fetching stats....");
        const res = await fetch("/api/v1/ending-stats");
        if (res.ok) {
            const data = await res.json();
            endingStats = data;
            console.log("Estadísticas recibidas: " + endingStats.length);
            //inicializamos los arrays para mostrar los datos
            endingStats.forEach((stat) => {
                e_country.push(stat.country + "-" + stat.year);
                e_women.push(stat["women"]);
                e_men.push(stat["men"]);
                e_average.push(stat["average"]);
            });
            await delay(500);
        } else {
            console.log("Error cargando los datos");
        }
    }

    let apiData = [];
    async function getData() {
        const res = await fetch("/api/v1/housework-stats/data");
        if (res.ok) {
            const json = await res.json();
            console.log(JSON.stringify(json));
            apiData = json;
            loadGraph();
        } else {
            console.log("Error in request");
        }
    }

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
            title: {
                text: "Housework-Repeaters-Ending Stats",
            },


            yAxis: {
                title: {
                    text: "Media de mujeres y hombres",
                },
            },

            xAxis: {
                categories: apiDataY,
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
                    pointStart: 2010,
                },
            },

            series: [
                {
                    name: "Housework",
                    data: apiDataA,
                },
               
                {
                    name: "Repeaters",
                    data: r_average,
                },
                {
                    name: "Ending",
                    data: e_average,
                },
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
    onMount(getData);
    onMount(getRepeatersStats);
    onMount(getEndingStats);

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
        <Button color="outline-dark" on:click={function (){window.location.href = `/`}}>Volver</Button>

    </figure>
</main>
