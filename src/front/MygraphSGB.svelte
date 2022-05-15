<script>
  import {onMount} from 'svelte';
  import Button from 'sveltestrap/src/Button.svelte';
  const delay = ms => new Promise(res => setTimeout(res,ms));
  let stats = [];
  let stats_country_date = [];
  let stats_women = [];
  let stats_men = [];
  let stats_average = []; 
  async function getDebtStats(){
    console.log("Fetching stats....");
    const res = await fetch("/api/v1/ending-stats");
    if(res.ok){
        const data = await res.json();
        stats = data;
        console.log("Estadísticas recibidas: "+stats.length);
        //inicializamos los arrays para mostrar los datos
        stats.forEach(stat => {
          stats_country_date.push(stat.country+"-"+stat.year);
          stats_women.push(stat["women"]);
          stats_men.push(stat["men"]);
          stats_average.push(stat["average"]);            
        });
        await delay(500);
        loadGraph();
    }else{
        console.log("Error cargando los datos");
    }
  }
  async function loadGraph() {
        Highcharts.chart("container", {
            chart: {
                type: "column",
            },
            title: {
                text: "escolarizacion",
            },
            subtitle: {
                text: "Source: https://ourworldindata.org/esco",
            },
            xAxis: {
                categories: country,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: "escolarizacion",
                },
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y} muertes</b></td></tr>',
                footerFormat: "</table>",
                shared: true,
                useHTML: true,
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            series: [
                {
                name: 'Escolarizacion Total',
                data: tot_esco
                },
                {
                name: 'Escolarización Hombres',
                data: tot_man
                },
                {
                name: 'Escolarización Mujeres',
                data: tot_wom
                
                }
                
            ]
        });
    }
  onMount(getDebtStats);
  
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js" on:load="{loadGraph}"></script>
  <script src="https://code.highcharts.com/modules/exporting.js" on:load="{loadGraph}"></script>
  <script src="https://code.highcharts.com/modules/export-data.js" on:load="{loadGraph}"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
  <h2>Datos de finalizar primaria por Género</h2>
  <h4>Biblioteca: ApexChart.js</h4>
  <div id='chart'></div>
  <Button color="outline-dark" on:click={function (){window.location.href = `/#/ApiSGB/`}}>Volver</Button>
</main>

<style>
#chart {
width: 90%;
margin: 35px auto;
border: 1px solid black;
}
</style>