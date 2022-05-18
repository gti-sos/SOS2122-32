<script> 
  import { onMount } from 'svelte';
  
  let apiData = [];
  async function getData(){
      const res = await fetch("/api/v1/housework-stats/data");
      if (res.ok){
          const json = await res.json();
          console.log(JSON.stringify(json));
          apiData = json;
          loadGraph();
      }else{
          console.log("Error in request");
      }
  }
  
  
  async function loadGraph(){
  let apiDataY = apiData.map(i=>{
      return [i.country,i.year];
  });
  
  console.log(apiDataY);
  var country = [];
  apiDataY.forEach(i=>{
      country.push(i[0]+" "+i[1]);
  });
  var men = apiData.map(i=>{
      return (i.men);
  });
  
  var women = apiData.map(i=>{
      return (i.women);
  });
  
  var average = apiData.map(i=>{
      return (i.average);
  })
  
  var trace1 = {
    type: 'scatter',
    x: men,
    y: country,
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
    y: country,
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
    y: country,
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
  
  var data = [trace1, trace2, trace3];
  
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