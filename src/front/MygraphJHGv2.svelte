<script> 
    import { onMount } from 'svelte';
    
    let apiData = [];
    let cya = [];
    let cym = [];
    let cyw = [];
    async function getData(){
        const res = await fetch("/api/v1/housework-stats/data");
        if (res.ok){
            const json = await res.json();
            apiData = json;
            let apiDataY = apiData.map(i=>{
                return [i.country,i.year,i.average,i.men,i.women];
            });
            apiDataY.forEach(i=>{
            cya.push([i[0]+" "+i[1],i[2]]);
            });
            apiDataY.forEach(i=>{
            cym.push([i[0]+" "+i[1],i[3]]);
            });
            apiDataY.forEach(i=>{
            cyw.push([i[0]+" "+i[1],i[4]]);
            });
            console.log(cya)
            loadGraph();
        }else{
            console.log("Error in request");
        }
    }
    
    
    async function loadGraph(){
    
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
            text: ''
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '<b>{series.name}</b>'
    },
    series: [{
        name: 'Media',
        data: cya,
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
    }, {
        name: 'Hombres',
        data: cym,
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
    }, {
        name: 'Mujeres',
        data: cyw,
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