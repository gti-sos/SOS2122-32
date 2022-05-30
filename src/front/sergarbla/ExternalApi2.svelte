<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let d1 = [];
    let d2 = [];
    let d3 = [];
    let campos = [];
    async function getData(){
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Host": "league-of-legends-stats.p.rapidapi.com",
                "X-RapidAPI-Key": "d3bfae311cmsh20678987bbefb3fp1007c1jsn050f38c0e13c"
            }
        };
        let res = await fetch("https://league-of-legends-stats.p.rapidapi.com/champions/stats",options);
        await delay(2000);
        if (res.ok) {
            let json = await res.json();
            for(let i = 0; i<10; i++){
                
                campos.push(json[i].date);
                d1.push(json[i].name);
                d2.push(json[i].hp);
                d3.push(json[i].armor);
            }
            loadGraph();
        }else{
            campos = [];
            d1 = [];
            d2 = [];
            d3 = [];
            loadGraph();
        }
    }
    
    async function loadGraph(){
        var ctx = document.getElementById("myChart").getContext("2d");
        var chart = new Chart(ctx, {
            type: "radar",
            responsive: true,
            maintainAspectRatio: false,
            data: {
                labels: campos,
                datasets: [
                    {
                        label: "Nombre",
                        backgroundColor: 'rgba( 40, 180, 99, 0.5)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointHoverBorderColor: 'rgb(255, 99, 132)',
                        data: d1,
                    },
                    {
                        label: "Vida",
                        backgroundColor: 'rgba( 241, 196, 15, 0.5)',
                        pointBackgroundColor: 'rgb(54, 162, 235)',
                        pointHoverBorderColor: 'rgb(54, 162, 235)',
                        data: d2,
                    },
                    {
                        label: "Armadura",
                        backgroundColor: 'rgba( 230, 78, 234, 0.5)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointHoverBorderColor: 'rgb(255, 99, 132)',
                        data: d3,
                    },
                ],
            }
        });
    }
    
    onMount(getData);
    
    </script>
    <svelte:head>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js" on:load="{loadGraph}"></script>
    
    </svelte:head>
    
    <main>
        <div>
            <h1>
                Vida y Armadura por Campeón
            </h1>
            <h2>
                League Of Legends
            </h2>
            <h2>
                API Externa 2
            </h2>
        </div>
        <div id="chartBox" >
            <canvas id="myChart" align="center"></canvas>
        </div>
      
        
        <br>
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
            padding: 30px;       
        }
    </style>