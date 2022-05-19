<script> 
    import { onMount } from 'svelte';
    
    let apiData = [];
    let result = [];
    async function getData(){
        const res = await fetch("https://apiv3.apifootball.com/?action=get_topscorers&league_id=302&APIkey=535d0cdf830c6c23fa827aa6ba6b66304fa8ffe3c3ee79f25288942d720d6962");
        if (res.ok){
            const json = await res.json();
            apiData = json;
            apiData.forEach(i=>{
                result.push({
                    name:i.player_name,
                    data:[parseInt(i.goals),parseInt(i.penalty_goals),parseInt(i.assists)]
                });
            })
            console.log(result);
        loadGraph();
    } else{
            console.log("Error in request");
        }
    }
    
    
    async function loadGraph(){
        Highcharts.chart('container', {
    chart: {
        type: 'area',
        inverted: true
    },
    title: {
        text: 'Top jugadores de la Lig Santander'
    },
    accessibility: {
        keyboardNavigation: {
            seriesNavigation: {
                mode: 'serialize'
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -150,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    },
    xAxis: {
        categories: [
            "goles",
            "penaltis",
            "asistencias"
        ]
    },
    yAxis: {
        title: {
            text: 'Number of units'
        },
        allowDecimals: false,
        min: 0
    },
    plotOptions: {
        area: {
            fillOpacity: 0.5
        }
    },
    series: result
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