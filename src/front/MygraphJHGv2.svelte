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
    let apiDataY = apiData.map(i=>{
    return [i.country,i.year,i.average];
});

console.log(apiDataY);
var country = [];
apiDataY.forEach(i=>{
    var r = [i[0]+" "+i[1],i[2]];
    country.push(r);
});
    console.log(country);
    
    Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Media de trabajos domésticos de hombres y mujeres en los años y países proporcionados'
    },
    subtitle: {
        text: ' '
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Average'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '<b>{point.y:.1f}</b>'
    },
    series: [{
        name: 'Population',
        data: country,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
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