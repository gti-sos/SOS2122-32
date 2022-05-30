<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";
    import UncontrolledAlert from "sveltestrap/src/UncontrolledAlert.svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let errorC= 0;
    let fechas = [];
    let men = [];
    let women = [];
    let average = [];
    let MenData = [];
    let WomenData = [];
    let PercentagesData = [];
    async function getData(){
        let res_pollution;
        let res_registrations;
        res_pollution = await fetch(`/api/v1/ending-stats`);
        res_registrations = await fetch(`https://sos2122-13.herokuapp.com/api/v2/immigrants`);
        if (res_pollution.ok && res_registrations.ok) {
            const json = await res_pollution.json();
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
                    MenData.push(json_reg[index].men);
                    WomenData.push(json_reg[index].women);
                    PercentagesData.push(json_reg[index].percentages);
                    json_reg.splice(index, 1);
                }else{
                    MenData.push(0);
                    WomenData.push(0);
                    PercentagesData.push(0);
                }
                men.push(json[i].men);
                women.push(json[i].women);
                average.push(json[i].average);
            }
            for(let i = 0; i<rangoMax; i++){
                fechas.push(json_reg[i].country+"/"+json_reg[i].year);
                MenData.push(json_reg[i].men);
                WomenData.push(json_reg[i].women);
                PercentagesData.push(json_reg[i].percentages);
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
                type:'line'
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
                    name: 'Hombres',
                    data: MenData,
                },{
                    name: 'Mujeres',
                    data: WomenData,
                },{
                    name: 'Porcentajes',
                    data: PercentagesData,
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
        <h1 align="center">Gráficas integrada de finalización escolar y tasa de inmigrantes</h1>
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
