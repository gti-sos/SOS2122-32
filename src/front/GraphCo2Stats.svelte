<script> 
    import { onMount } from 'svelte';
    
    let apiData = [];
    let apiData1 = [];
    let men = [];
    let women = [];
    let average = [];
    let cy = [];
    let cy2 = [];
    let tot = [];
    let kg = [];
    let tpc = [];
    async function getData(){
        const res1 = await fetch("https://sos2122-22.herokuapp.com/api/v2/co2-stats");
        const res = await fetch("/api/v1/housework-stats/data");
        if (res.ok){
            const json1 = await res1.json();
            apiData1 = json1;
            let apiDataZ = apiData1.map(i=>{
                return [i.country,i.year];
            });
            apiDataZ.forEach(i=>{
            cy2.push(i[0]+" "+i[1]);
            });
            tot = apiData1.map(i=>{
                return (i.co2_tot/100);
            });
            tpc = apiData1.map(i=>{
                return (i.co2_tpc);
            });
            kg = apiData1.map(i=>{
                return (i.co2_kg);
            });
            console.log(apiData1);
            const json = await res.json();
            apiData = json;
            let apiDataY = apiData.map(i=>{
                return [i.country,i.year];
            });
            apiDataY.forEach(i=>{
            cy.push(i[0]+" "+i[1]);
            });
            men = apiData.map(i=>{
                return (i.men);
            });
            women = apiData.map(i=>{
                return (i.women);
            });
            average = apiData.map(i=>{
                return (i.average);
            });
            loadGraph();
        }else{
            console.log("Error in request");
        }
    }
    
    
    async function loadGraph(){
    
    var trace1 = {
      type: 'scatter',
      x: men,
      y: cy,
      mode: 'markers',
      name: 'Men',
      marker: {
        color: 'rgba(156, 165, 196, 0.95)',
        line: {
          color: 'rgba(156, 165, 196, 1.0)',
          width: 1,
        },
        symbol: 'circle',
        size: 16
      }
    };
    
    var trace2 = {
      x: women,
      y: cy,
      mode: 'markers',
      name: 'Women',
      marker: {
        color: 'rgba(204, 204, 204, 0.95)',
        line: {
          color: 'rgba(217, 217, 217, 1.0)',
          width: 1,
        },
        symbol: 'circle',
        size: 16
      }
    };
    
    var trace3 = {
      x: average,
      y: cy,
      mode: 'markers',
      name: 'Average',
      marker: {
        color: 'rgba(204, 204, 204, 3)',
        line: {
          color: 'rgba(217, 123, 217, 1.0)',
          width: 1,
        },
        symbol: 'circle',
        size: 16
      }
    };

    var trace4 = {
      x: kg,
      y: cy2,
      mode: 'markers',
      name: 'Kg',
      marker: {
        color: 'rgba(204, 204, 33, 100)',
        line: {
          color: 'rgba(217, 123, 217, 1.0)',
          width: 1,
        },
        symbol: 'circle',
        size: 16
      }
    };

    var trace5 = {
      x: tot,
      y: cy2,
      mode: 'markers',
      name: 'Tot',
      marker: {
        color: 'rgba(2, 204, 33, 100)',
        line: {
          color: 'rgba(217, 123, 217, 1.0)',
          width: 1,
        },
        symbol: 'circle',
        size: 16
      }
    };

    var trace6 = {
      x: tpc,
      y: cy2,
      mode: 'markers',
      name: 'Tpc',
      marker: {
        color: 'rgba(233, 204, 83, 100)',
        line: {
          color: 'rgba(217, 123, 217, 1.0)',
          width: 1,
        },
        symbol: 'circle',
        size: 16
      }
    };
    
    var data = [trace1, trace2, trace3, trace4, trace5, trace6];
    
    var layout = {
      title: 'Housework Stats',
      xaxis: {
        showgrid: false,
        showline: true,
        linecolor: 'rgb(102, 102, 102)',
        titlefont: {
          font: {
            color: 'rgb(204, 204, 204)'
          }
        },
        tickfont: {
          font: {
            color: 'rgb(102, 102, 102)'
          }
        },
        autotick: false,
        dtick: 10,
        ticks: 'outside',
        tickcolor: 'rgb(102, 102, 102)'
      },
      margin: {
        l: 140,
        r: 40,
        b: 50,
        t: 80
      },
      legend: {
        font: {
          size: 10,
        },
        yanchor: 'middle',
        xanchor: 'right'
      },
      width: 600,
      height: 600,
      paper_bgcolor: 'rgb(254, 247, 234)',
      plot_bgcolor: 'rgb(254, 247, 234)',
      hovermode: 'closest'
    };
    
    Plotly.newPlot('myDiv', data, layout);
    
    }
    onMount(getData);
    </script>
    
    <svelte:head>
        <script src='https://cdn.plot.ly/plotly-2.11.1.min.js' on:load="{loadGraph}"></script>
    </svelte:head>
    
    <main>
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description">
               Este gráfico muestra los datos de mujeres y hombres que realizan trabajos domésticos de los paises indicados en los años proporcionados.
            </p>
            <div id = "myDiv"></div>
        </figure>
    </main>