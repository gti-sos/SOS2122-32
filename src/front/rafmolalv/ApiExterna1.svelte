<script>
    import { onMount } from "svelte";
    import Button from 'sveltestrap/src/Button.svelte';
    //import Highcharts from "highcharts";
    const delay = ms => new Promise(res => setTimeout(res,ms));

 
    let apiData = [];
    let valores = [];

    let personaje=[];
    let kills=[];

    let asesinatos_correcion=[];


    async function getDatosPrisonBreak() {
        console.log("Fetching stats....");
        const res = await fetch("https://prisonbreakapi.me/api/characters");
        if (res.ok) {
            const data = await res.json();
            data.forEach((stat) => {
                if(stat["kills"]>0 && stat["kills"]!="null"){
                    console.log("Personaje: "+ JSON.stringify(stat["name"],null,2) + " Kills: "+ JSON.stringify(stat["kills"],null,2));
                    personaje.push(stat["name"]);
                    kills.push(parseInt(stat["kills"]),10);

                }           
                
               
            });

            kills.forEach((dato) =>{
                if(dato!=10){
                    asesinatos_correcion.push(dato);
                }
            })

            
            console.log("Estadísticas recibidas: " + JSON.stringify(asesinatos_correcion,null,2));


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
                type: 'column'
            },
            title: {
                text: 'Numero de asesinatos de los principales personajes de Prison Break'
            },
            
            xAxis: {
                crosshair: true,
                tickmarkPlacement: 'on',
                categories: personaje,
                
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
          name: 'Asesinatos',
          data: asesinatos_correcion
        }]
        });
    }
    onMount(getDatosPrisonBreak);
    

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
