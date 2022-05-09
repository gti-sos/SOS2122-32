<script>
  //import Highcharts from "highcharts"
    import { onMount } from "svelte";
        const BASE_API_PATH = "/api/v1/ending-stats";
        let Stats=[];
        let Stats_date = [];
        let stats_women = [];
        let stats_men = [];
        let stats_average = [];
     
            let errorMsg="Tiene que cargar los datos para visualizar las analíticas.";
        let cargados = false;
        async function loadGraph() {
            console.log("Fetching data...");
            const res = await fetch(BASE_API_PATH);
            var EndingData = await res.json();
            if (res.ok) {
                Stats.forEach(stat => {
                    Stats_date.push(stat.country+"-"+stat.year);
                    stats_women.push(stat.women);
                    stats_men.push(stat.men);
                    stats_average.push(stat.average);
                });
                cargados=true;
            }
             
        console.log("Waste data: " + EndingData);
                
        Highcharts.chart('container', {
          chart: {
              type: 'column'
          },
          title: {
              text: 'Porcentajes de hombres mujeres y media'
          },
          xAxis: {
              categories: Stats_date,
              crosshair: true
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Rainfall (mm)'
              }
          },
          tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                  '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
          },
          plotOptions: {
              column: {
                  pointPadding: 0.2,
                  borderWidth: 0
              }
          },
          series: [{
              name: 'Mujer',
              data: stats_women
          }, {
              name: 'Hombre',
              data: stats_men
          }, {
              name: 'Average',
              data: stats_average
          }]
      });
        }
        onMount(loadGraph);
      </script>
      
      <svelte:head>
      <script src="https://code.highcharts.com/highcharts.js"></script>
      <script src="https://code.highcharts.com/modules/series-label.js"></script>
      <script src="https://code.highcharts.com/modules/exporting.js"></script>
      <script src="https://code.highcharts.com/modules/export-data.js"></script>
      <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
      </svelte:head>
      
      <main>
        <div>
            <h2>
              Análiticas
            </h2>
          </div>
      
        <div>
            <figure class="highcharts-figure">
              <div id="container" />
              <p class="highcharts-description">
                Porcentajes hombres y mujeres que finalizan
              </p>
            </figure>
        </div>
        
      
        <div>
          {#if !cargados}
            <p class="error">{errorMsg}</p>
          {/if}
        </div>
      </main>
      
      <style>
        main {
            text-align: center;
            padding: 30px;       
        }
        p.error{
          color: red; 
          text-align:center;
          font-size: 20px;
          margin-top:80px;
        }
        
       
      </style>