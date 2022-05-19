<script> 
    import { onMount } from 'svelte';
    
    let apiData = [];
    let result = [];
    async function getData(){
        const res = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=8c32a6fcd426cb5461db1158020cbceb");
        if (res.ok){
            const json = await res.json();
            apiData = json;
            apiData.results.forEach(i=>{
                let dicc = i;
                result.push({
                    name:dicc.title,
                    y:dicc.popularity
                });
            });
            console.log(apiData);
        loadGraph();
    } else{
            console.log("Error in request");
        }
    }
    
    
    async function loadGraph(){
        Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Popularidad de películas'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Media de puntuación',
        colorByPoint: true,
        data: result
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
            </p>
        </figure>
    </main>