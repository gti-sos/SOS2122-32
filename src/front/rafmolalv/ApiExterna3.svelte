<script>
    import { onMount } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";
    //import Highcharts from "highcharts";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    

    let apiData = [];
    let valores = [];


    let pais = [];
    let muertes = [];
    let casos_activos = [];

    async function getDatosCovid() {
        console.log("Fetching stats....");
        
        const resData2 = await fetch(
            "https://corona-virus-world-and-india-data.p.rapidapi.com/api",
            {
                method: "GET",
                headers: {
                    "X-RapidAPI-Host":
                        "corona-virus-world-and-india-data.p.rapidapi.com",
                    "X-RapidAPI-Key":
                        "b7fb0a19e5mshaf96368ee9cb63ep1a914cjsn8fb479adbc58",
                },
            }
        );

        if (resData2.ok) {
            const data2 = await resData2.json();

            console.log(data2.length);

            console.log(
                "Estadísticas recibidas: " + JSON.stringify(data2, null, 2)
            );
            //inicializamos los arrays para mostrar los datos
            

            data2.countries_stat.forEach((stat) => {
                let dato_muertes = stat["deaths"];
                dato_muertes = dato_muertes.replace(/,/g, '');
                let datos_casos_activos = stat["active_cases"];
                datos_casos_activos = datos_casos_activos.replace(/,/g, '');

                if(dato_muertes>=150000){
                    pais.push(stat["country_name"]);
                    muertes.push(parseInt(dato_muertes, 10));
                    casos_activos.push(parseInt(datos_casos_activos,10));

                }

            });
            console.log("Pais: " + JSON.stringify(pais, null, 2) + " Muertes: "+ JSON.stringify(muertes, null, 2) + " Casos activos: "+ JSON.stringify(casos_activos, null, 2))


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
                type: "bar",
            },
            title: {
                text: "Países con más de 150.000 muertes por covid y los casos activos que tienen",
            },

            xAxis: {
                crosshair: true,
                tickmarkPlacement: "on",
                categories: pais,
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Valor",
                },
                labels: {
                    formatter: function () {
                        return valores;
                    },
                },
            },

            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            legend: {
                enabled: true,
            },

            series: [
                {
                    name: "Muertes",
                    data: muertes,
                },
                {
                    name: "Casos activos",
                    data: casos_activos,
                },
            ],
        });
    }
    onMount(getDatosCovid);
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

        <Button
            color="outline-dark"
            on:click={function () {
                window.history.back();
            }}>Volver</Button
        >
    </figure>
</main>
