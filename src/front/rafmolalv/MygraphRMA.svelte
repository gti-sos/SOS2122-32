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
      const res = await fetch("/api/v2/repeaters-stats");
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
    async function loadGraph(){
      var options = {
        
        series: [{
          name: 'Mujeres',
          data: stats_women
        }, {
          name: 'Hombres',
          data: stats_men
        }, {
          name: 'Media',
          data: stats_average
        }],
        chart: {
        height: 450,
        type: 'bar'
        },
        dataLabels: {
          enabled: false
        },
        
        xaxis: {
          type: 'País-Año',
          categories: stats_country_date
        },
        yAxis: {
          title: {
              text: 'Valor'
          }
        },
        
      };
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    }
    onMount(getDebtStats);
    
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</svelte:head>

<main>
    <h2>Datos de repetidores en primaria</h2>
    <h4>Biblioteca: ApexChart.js</h4>
    <div id='chart'></div>
    <Button color="outline-dark" on:click={function (){window.history.back()}}>Volver</Button>
  </main>

<style>
#chart {
  width: 90%;
  margin: 35px auto;
  border: 1px solid black;
}
</style>