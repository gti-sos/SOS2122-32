<script> 
import { onMount } from 'svelte';

let apiData = [];
async function getData(){
    const res = await fetch("/api/v1/housework-stats/data");
    if (res.ok){
        const json = await res.json();
        console.log(JSON.stringify(json));
        apiData = json;
        loadGraph();
    }else{
        console.log("Error in request");
    }
}


async function loadGraph(){
    let apiDataA = apiData.map(i=>{
    return (i.average);
});
let apiDataY = apiData.map(i=>{
    return [i.year,i.country];
});
console.log(apiDataY)

Highcharts.chart('container', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Housework stats'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: apiDataY
    },
    yAxis: {
        title: {
            text: 'Media mujeres y hombres'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Housework',
        data: apiDataA
    }]
});
}
onMount(getData);
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
           Este gráfico muestra los datos de mujeres y hombres que realizan trabajos domésticos de los paises indicados en los años proorcionados.
        </p>
    </figure>
</main>