<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";
    import UncontrolledAlert from "sveltestrap/src/UncontrolledAlert.svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let errorC= 0;
    let fechas = [];
    //
    let men = [];
   let women = [];
   let average = [];
   let ElectricityGenerationData = [];
  let ElectricityConsumptionData = [];
  let ElectricityPerCapitaData = [];

    //

    async function getData(){
        let res_ending;
        let res_registrations;
        res_ending = await fetch(`/api/v1/ending-stats`);
        res_registrations = await fetch(`/remoteElectricity`);
        if (res_ending.ok && res_registrations.ok) {
            const json = await res_ending.json();
            const json_reg = await res_registrations.json();
            let rangoMax = 5;
            const country_years = [];
            for(let i = 0; i<json_reg.length;i++){
                country_years.push(json_reg[i].country+"/"+json_reg[i].year);
            }
            for(let i = 0; i<rangoMax; i++){
                let fecha = json[i].country+"/"+json[i].year;
                fechas.push(fecha);
                if(country_years.includes(fecha)){
                    let index = country_years.indexOf(fecha);
                    ElectricityGenerationData.push(json_reg[index].eletricity_generation);
                    ElectricityConsumptionData.push(json_reg[index].electricity_consumption);
                    ElectricityPerCapitaData.push(json_reg[index].per_capita_consumption);
                    json_reg.splice(index, 1);
                }else{
                    ElectricityGenerationData.push(0);
                    ElectricityConsumptionData.push(0);
                    ElectricityPerCapitaData.push(0);
                }
                men.push(json[i].men);
                women.push(json[i].women);
                average.push(json[i].average);
            }
            for(let i = 0; i<rangoMax; i++){
                fechas.push(json_reg[i].country+"/"+json_reg[i].year);
                ElectricityGenerationData.push(json_reg[i].eletricity_generation);
                ElectricityConsumptionData.push(json_reg[i].electricity_consumption);
                ElectricityPerCapitaData.push(json_reg[i].per_capita_consumption);
                men.push(0);
                women.push(0);
                average.push(0);
            }
            console.log(fechas);
            console.log(json_reg);
            await delay(1000);
            loadGraph();
        }else{
            errorC = 200.4;
            await delay(1000);
            loadGraph();
        }
    }
    
    async function loadGraph(){
        
        Highcharts.chart('container', {
        
            chart: {
                type:'bar'
            },
            title: {
                text: `Gráfica conjunta `
            },
        
            yAxis: {
                min:0,
                title: {
                    text: 'Valor'
                }
            },
        
            xAxis: {
                categories: fechas,
                title: {
                    text: 'Ciudad/Año'
                },
                crosshair: true
            },
        
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
        
            series: [{
                    name: 'Hombres',
                    data: men
                },
                {
                    name: 'Mujeres',
                    data: women
                },
                {
                    name: 'Promedio',
                    data: average
                },
                {
                    name: 'Electricidad Generada',
                    data: ElectricityGenerationData,
                },{
                    name: 'Electricidad Consumida ',
                    data: ElectricityConsumptionData,
                },{
                    name: 'Electricidad per Capita',
                    data: ElectricityPerCapitaData,
                }
            ]
        
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
        {#if errorC === 200.4}
        <br>
        <UncontrolledAlert  color="danger" >
			ERROR EN LA SOLICITUD A LOS DATOS
        </UncontrolledAlert>
        {/if}
        <br>
        <h1 align="center">Gráficas integrada de Finalización escolar y Gasto electrico</h1>
        <br>
        <figure class="highcharts-figure">
            <div id="container"></div>
        </figure>
        <br><br>
        <Button outline color="dark" on:click="{()=>{
            pop();
        }}">
        Volver
        </Button>
        <br><br>
    </main>