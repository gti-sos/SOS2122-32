<script>
    import { onMount } from "svelte";
    import Button from 'sveltestrap/src/Button.svelte';

    //import Highcharts from "highcharts";
    const delay = ms => new Promise(res => setTimeout(res,ms));


    let fechas = [];

    let r_public_expenditure = ["public_expenditure"];
    let r_pe_to_gdp = ["pe_to_gdp"];
    let r_pe_on_defence = ["pe_on_defence"];

    let r_women = ["mujeres"];
    let r_men = ["hombres"];
    let r_average = ["media"];

    
   
    let datos = [];
    let datos1 = [];

    let apiData = [];
   

    async function getStats() {
        console.log("Fetching stats....");
        const res = await fetch("/remoteExp");
        const res1 = await fetch("/api/v2/repeaters-stats");

        if (res.ok) {
            datos = await res.json();
            console.log("Estadísticas recibidas: " + datos.length);
            //inicializamos los arrays para mostrar los datos
            datos.forEach((stat) => {
                fechas.push(stat["country"] + "-" + stat.year);
                r_public_expenditure.push(stat["public_expenditure"]);
                r_pe_to_gdp.push(stat["pe_to_gdp"]);
                r_pe_on_defence.push(stat["pe_on_defence"]);
            });

            datos1 = await res1.json();
            console.log(datos1);
            console.log(JSON.stringify(datos1, null, 2));
            datos1.forEach((stat) => {
                fechas.push(stat["country"] + "-" + stat.year);
                r_women.push(stat.women);
                r_men.push(stat.men);
                r_average.push(stat.average);
            });

            await delay(500);
        } else {
            console.log("Error cargando los datos");
        }
    }

    async function loadGraph(){
        var chart = bb.generate({
            data: { 
                columns: [
                ],
                type: "bar", 
            },
            bar: {
                width: {
                    ratio: 0.5,
                },
            },
            bindto: "#barChart_1",
        });
        setTimeout(function () {
            chart.load({
                columns: [r_women],
                type: "bar"
            });
        }, 1000);
        setTimeout(function () {
            chart.load({
                columns: [r_men],
                type: "bar"
            });
        }, 2000);
        setTimeout(function () {
            chart.load({
                columns: [r_average],
                type: "bar"
            });
        }, 3000);
       
        setTimeout(function () {
            chart.load({
                columns: [r_public_expenditure],
                type: "bar"
            });
        }, 4000);
        setTimeout(function () {
            chart.load({
                columns: [r_pe_to_gdp],
                type: "bar"
            });
        }, 5000);
        setTimeout(function () {
            chart.load({
                columns: [r_pe_on_defence],
                type: "bar"
            });
        }, 6000); 
    }
    onMount(getStats);

</script>

<svelte:head>
    <script src="https://d3js.org/d3.v6.min.js"></script>  
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/billboard.js/3.4.1/billboard.min.css"/>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/billboard.js/3.4.1/billboard.min.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <h1 align="center">Integracion de los datos de repetidores en primaria junto a los datos
         de gasto público </h1>

    <br />
    <div id="barChart_1"></div>
    <Button color="outline-dark" on:click={function (){window.history.back();}}>Volver</Button>

</main>
