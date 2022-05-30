<script>
    import { onMount } from "svelte";
    import Button from 'sveltestrap/src/Button.svelte';
   import{Nav, NavItem, NavLink } from "sveltestrap";
   import {pop} from "svelte-spa-router";
   const BASE_API_PATH = "/api/v1/ending-stats";
   let myConfig = {};
   let endingData=[];
   let endingCountryYear = [];
   let men = [];
   let women = [];
   let average = [];
   async function getData() {
       console.log("Fetching data...");
       const res = await fetch(BASE_API_PATH );
       
           
       if (res.ok) {
           const data = await res.json();
           
           endingData = data;
           endingData.forEach(stat => {
            endingCountryYear.push(stat.country+"-"+stat.year);
           men.push(parseInt(stat.men));
           women.push(parseInt(stat.women));
           average.push(parseFloat(stat.average));
           });
           
       }
   }
   
   getData();
   myConfig = {
     type: 'bar',
     title: {
       text: 'Datos de Finalización estudio',
       fontSize: 24,
     },
     legend: {
       draggable: true,
     },
     scaleX: {
   
       label: { text: 'Países año' },
   
       labels: endingCountryYear
     },
     scaleY: {
       
       label: { text: 'Datos' }
     },
     plot: {
       
       animation: {
         effect: 'ANIMATION_EXPAND_BOTTOM',
         method: 'ANIMATION_STRONG_EASE_OUT',
         sequence: 'ANIMATION_BY_NODE',
         speed: 275,
       }
     },
     series: [
       {
         
         values: men,
         text: 'Hombres inmigrantes',
       },
       {
         
         values: women,
         text: 'Mujeres inmigrantes'
       },
       {
         
         values: average,
         text: 'Promedio'
       }
     ]
   };
           
   loadGraph();
       
   async function loadGraph() {
       zingchart.render({
           id: 'myChart',
           data: myConfig,
       });
   }
</script>

<svelte:head>
   <script src="https://cdn.zingchart.com/zingchart.min.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <head>
       <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
     </head>
   <div id="myChart"></div>

   <br><br>
        <Button outline color="dark" on:click="{()=>{
            pop();
        }}">
        Volver
        </Button>
        <br><br>

   
</main>
    