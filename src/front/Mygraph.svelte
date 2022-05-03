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
            Highcharts.chart('container', {

        title: {
            text: 'Solar Employment Growth by Sector, 2010-2016'
        },

        subtitle: {
            text: 'Source: thesolarfoundation.com'
        },

        yAxis: {
            title: {
                text: 'Media de mujeres y hombres'
            }
        },

        xAxis: {
            categories: apiDataY
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },

        series: [{
            name: 'Housework',
            data: apiDataA
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

        });
    }
    onMount(getData);
</script>

<svelte:head>

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>

</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Basic line chart showing trends in a dataset. This chart includes the
            <code>series-label</code> module, which adds a label to each line for
            enhanced readability.
        </p>
    </figure>
</main>