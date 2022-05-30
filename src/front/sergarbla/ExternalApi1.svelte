<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let Assists = [];
    let Turnovers = [];
    let ejeX = [];
    async function getData(){
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Host": "poke-info-api.p.rapidapi.com",
                "X-RapidAPI-Key": "d3bfae311cmsh20678987bbefb3fp1007c1jsn050f38c0e13c"
            }
        };
        let res = await fetch("https://poke-info-api.p.rapidapi.com/pokemons",options);
        await delay(2000);
        if (res.ok) {
            let json = await res.json();
            for(let i = 0; i<10; i++){
                
                //Nombre
                ejeX.push(json[i].name);
                //stats totales
                Assists.push(json[i].statTotal);
                //vida del pokemon
                Turnovers.push(json[i].stats.hp);
    
            }
            loadGraph();
        }else{
            ejeX = [];
            Assists = [];
            Turnovers = [];
            loadGraph();
        }
    }
    
    async function loadGraph(){
        var chart = bb.generate({
            bindto: "#barChart",
            axis: {
                x: {
                type: "category",
                categories: ejeX
                }
            },
            data: {
                type: "area",
                labels:true,
                columns: [
                    Assists,
                    Turnovers
                ]
            },
            bar: {
                width: {
                ratio: 0.5
                }
            }
        });
    }
    
    onMount(getData);
    
    </script>
    <svelte:head>
        <script src="https://d3js.org/d3.v6.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/billboard.js/3.4.1/billboard.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/billboard.js/3.4.1/billboard.min.js" on:load="{loadGraph}"></script>
    
    </svelte:head>
    
    <main>
        <div>
            <h1>
             Estadisticas de Pokemon
            </h1>
            <h2>
                Api Externa 1
               </h2>
        </div>
        <div id="barChart" align="center"></div>
      
        
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