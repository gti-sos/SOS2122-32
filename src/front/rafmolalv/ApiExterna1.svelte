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
        type: 'columnpyramid'
    },
    title: {
        text: 'Los 5 personajes principales que más mataron en Prison Break'
    },
    colors: ['#C79D6D', '#B5927B', '#CE9B84', '#B7A58C', '#C7A58C'],
    xAxis: {
        crosshair: true,
        labels: {
            style: {
                fontSize: '14px'
            }
        },
        type: 'category'
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Asesinatos'
        }
    },
    
    series: [{
        name: 'Asesinatos',
        colorByPoint: true,
        data: [

        
            [personaje[0], asesinatos_correcion[0]],
            [personaje[1], asesinatos_correcion[1]],
            [personaje[2], asesinatos_correcion[2]],
            [personaje[3], asesinatos_correcion[3]],
            [personaje[4], asesinatos_correcion[4]]
        ],
        showInLegend: false
    }]
});
    }
    onMount(getDatosPrisonBreak);
    

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
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
