<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';

    const delay = ms => new Promise(res => setTimeout(res,ms));


    let stats = [];
    let stats_country_date = [];
    let stats_percentages_access_elecetricity = [];
    let stats_non_renewable_energy_consumptions = [];
    let stats_renewable_energy_consumptions = []; 

    let r_women = ["mujeres"];
    let r_men = ["hombres"];
    let r_average = ["media"];
   
    let datos = [];
    let datos1 = [];

    async function getDebtStats(){
      console.log("Fetching stats....");
      const res = await fetch("https://sos2122-10.herokuapp.com/api/v2/energy-consumptions");
      const res1 = await fetch("/api/v2/repeaters-stats");

      if(res.ok){
          const datos = await res.json();
          console.log("Estadísticas recibidas: "+datos.length);
          //inicializamos los arrays para mostrar los datos
          datos.forEach(stat => {
            stats_country_date.push(stat["country"] + "-" + stat.year);
            stats_percentages_access_elecetricity.push(stat["percentages_access_elecetricity"]);
            stats_non_renewable_energy_consumptions.push(stat["non_renewable_energy_consumptions"]);
            stats_renewable_energy_consumptions.push(stat["renewable_energy_consumptions"]);            
          });
          datos1 = await res1.json();
            console.log(datos1);
            console.log(JSON.stringify(datos1, null, 2));
            datos1.forEach((stat) => {
                stats_country_date.push(stat["country"] + "-" + stat.year);
                r_women.push(stat.women);
                r_men.push(stat.men);
                r_average.push(stat.average);
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
          name: 'Acceso a la electricidad',
          data: stats_percentages_access_elecetricity
        }, {
          name: 'Energía No Renovable Consumida	',
          data: stats_non_renewable_energy_consumptions
        }, {
          name: 'Energía Renovable Consumida',
          data: stats_renewable_energy_consumptions
        },{
          name: 'Mujeres	',
          data: r_women
        },{
          name: 'Hombres	',
          data: r_men
        },{
          name: 'Media',
          data: r_average
        }],
        chart: {
        height: 450,
        type: 'area'
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
    <h4>Integracion de los datos de repetidores en primaria junto a los datos de consumo de energía
    </h4>
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