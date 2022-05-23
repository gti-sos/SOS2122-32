<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';

    const delay = ms => new Promise(res => setTimeout(res,ms));
   
    let datos1 = [];

    let criptomoneda=[];
    let precio=[];


    async function getCriptos(){
      console.log("Fetching stats....");
      const resData = await fetch(
            "https://live-crypto-prices.p.rapidapi.com/pricefeed",
            {
                method: "GET",
                headers: {
                  'X-RapidAPI-Host': 'live-crypto-prices.p.rapidapi.com',
                  'X-RapidAPI-Key': 'b7fb0a19e5mshaf96368ee9cb63ep1a914cjsn8fb479adbc58'
                },
            }
        );
      if(resData.ok){
        datos1 = await resData.json();
            console.log(JSON.stringify(datos1, null, 2));

            datos1.result.forEach(stat => {
              let dato_precio = stat["Price"];
              dato_precio = dato_precio.replace(/,/g, '');
              dato_precio = dato_precio.slice(1);
              if(parseInt(dato_precio,10)>=1000){
                console.log(stat["CoinName"]);
                console.log(dato_precio);

                criptomoneda.push(stat["CoinName"]);
                precio.push(dato_precio);

              }
              
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
          name: 'Precio',
          data: precio
        }],
        chart: {
        height: 450,
        type: 'radar'
        },
        dataLabels: {
          enabled: false
        },
        
        xaxis: {
          categories: criptomoneda
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
    onMount(getCriptos);
    
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</svelte:head>

<main>
    <h2>Precio de las criptomonedas más caras del mercado</h2>
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