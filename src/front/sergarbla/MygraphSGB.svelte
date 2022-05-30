<script>
    import { onMount } from "svelte";
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";
    
    
        const BASE_API_PATH = "/api/v1/ending-stats";
        let endingData=[];
        let endingCountryYear = [];
        let women = [];
        let men = [];
        let average = [];
     
            let errorMsg="Tiene que cargar los datos para visualizar las analíticas.";
        let cargados = false;
        async function loadGraphWithDelay() {
            setTimeout(loadGraph, 1000);
        }
        async function loadGraph() {
            console.log("Fetching data...");
            const res = await fetch(BASE_API_PATH);
            endingData = await res.json();
            if (res.ok) {
                endingData.forEach(stat => {
                    endingCountryYear.push(stat.country+"-"+stat.year);
                    women.push(stat.women);
                    men.push(stat.men);
                    average.push(stat.average);
                });
                cargados=true;
                console.log(endingData)
            }
            
        console.log("Ending data: " + endingData);
                
        Highcharts.chart('container', {
          chart: {
              type: 'spline'
          },
          title: {
              text: 'Porcentajes de Mujeres, Hombres y Promedio por paises'
          },
          xAxis: {
              categories: endingCountryYear,
              crosshair: true
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Porcentaje (%)'
              }
              
          },
          tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                  '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
          },
          plotOptions: {
              column: {
                  pointPadding: 0.1,
                  borderWidth: 0
              }
          },
          series: [{
              name: 'Porcentaje de Mujeres',
              data: women
          }, {
              name: 'Porcentaje de Hombres',
              data: men
          }, {
              name: 'Promedio',
              data: average
          }]
      });
        }
        onMount(loadGraphWithDelay);
      </script>
      
      <svelte:head>
      <script src="https://code.highcharts.com/highcharts.js"></script>
      <script src="https://code.highcharts.com/modules/series-label.js"></script>
      <script src="https://code.highcharts.com/modules/exporting.js"></script>
      <script src="https://code.highcharts.com/modules/export-data.js"></script>
      <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraphWithDelay}"></script>
      </svelte:head>
      
      <main>
            
            
        
            
        <div>
            <h2>Datos de repetidores en primaria</h2>
          </div>
          <h4>Biblioteca: ApexChart.js</h4>
      
        <div>
            <figure class="highcharts-figure">
              <div id="container" />
              <p class="highcharts-description">
                Porcentajes de Mujeres, Hombres y Promedio por paises.
              </p>
            </figure>
        </div>
        
      
        <div>
          {#if !cargados}
            <p class="error">{errorMsg}</p>
          {/if}
        </div>
        <br><br>
        <Button outline color="dark" on:click="{()=>{
            pop();
        }}">
        Volver
        </Button>
        <br><br>
      </main>
      
      <style>
        main {
            text-align: center;
            padding: 50px;       
        }
        p.error{
          color: red; 
          text-align:center;
          font-size: 20px;
          margin-top:80px;
        }
        
        
       
      </style>