<script>
    import { onMount } from "svelte";
    import Button from 'sveltestrap/src/Button.svelte';
    //import Highcharts from "highcharts";
    const delay = ms => new Promise(res => setTimeout(res,ms));

    let apiData = [];
    let valores = [];

    let equipo=[];
    let goles=[];



    async function getDatosGoles() {
        console.log("Fetching stats....");
        const res = await fetch("https://www.thesportsdb.com/api/v1/json/2/lookuptable.php?l=4335&s=2021-2022");
        if (res.ok) {
            const data = await res.json();
            //inicializamos los arrays para mostrar los datos
            data.table.forEach((stat) => {

               
                    equipo.push(stat["strTeam"]);
                    goles.push(parseInt(stat["intGoalsFor"],10));
                            
                console.log("Equipo"+ JSON.stringify(equipo,null,2) + " , Goles: "+JSON.stringify(goles,null,2))
                
               
            });         

            await delay(500);

            loadGraph();

        } else {
            console.log("Error cargando los datos");
        }
    }

    async function loadGraph() {
        let apiDataA = apiData.map((i) => {
            return i.average;
        });
        let apiDataY = apiData.map((i) => {
            return [i.year, i.country];
        });
        Highcharts.chart('container', {
            chart: {
                type: 'areaspline'
            },
            title: {
                text: 'Numero de goles en la temporada 21/22 en LaLiga'
            },
            
            xAxis: {
                crosshair: true,
                tickmarkPlacement: 'on',
                categories: equipo,
                
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Valor'
                },
                labels: {
                    formatter: function(){
                        return valores;
                    }
                }
            },
            
            plotOptions: {
                column:{
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            legend: {
                enabled: true
            },
            
            series: [{
          name: 'Goles',
          data: goles
        }]
        });
    }
    onMount(getDatosGoles);
    

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>  
    <script
        src="https://code.highcharts.com/modules/accessibility.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container" />
      
        <Button color="outline-dark" on:click={function (){window.history.back()}}>Volver</Button>

    </figure>
</main>
