<script>
    import { onMount } from 'svelte';
	import Table from 'sveltestrap/src/Table.svelte';
	import Button from 'sveltestrap/src/Button.svelte';
    let ending = [];
	let newEnding = {
		country: "",
		year: "",
		women: "",
        men: "",
        average: ""
	}
	let from = null;
	let to = null;
	let offset = 0;
	let limit = 10;
	let mP = 0;
	let nEnding;
    onMount(getPollutionStats);
    async function getPollutionStats(){
        console.log("Fetching ending...."); 
		let page = `/api/v1/ending-stats?limit=${limit}&&offset=${offset*10}&&`;
		if (from != null) {
			page = page + `from=${from}&&`
		}
		if (to != null) {
			page = page + `to=${to}&&`
		}
        const res = await fetch(page);
        if(res.ok){
			let cPage = page.split(`limit=${limit}&&offset=${offset*10}`);
			mPFunction(cPage[0]+cPage[1]);
            const data = await res.json();
            ending = data;
			nEnding = ending.length;
            console.log("Received entries: "+ending.length);
        }else{
			Errores(res.status);
		}
    }
	async function insertPollution(){
        console.log("Inserting ending...."+JSON.stringify(newEnding));
        const res = await fetch("/api/v1/ending-stats",
			{
				method: "POST",
				body: JSON.stringify(newEnding),
				headers: {
					"Content-Type": "application/json"
				}
			}); 
		if(res.ok){
			newEnding;
			getPollutionStats();
			window.alert("Entrada introducida con éxito");
		}else{
			Errores(res.status);
		}
    }
	async function BorrarPollution(countryDelete, yearDelete){
        console.log("Deleting polution....");
        const res = await fetch("/api/v1/ending-stats/"+countryDelete+"/"+yearDelete,
			{
				method: "DELETE"
			}).then(function (res){
				if(nEnding==1){
					from = null;
					to = null;
				}
				getPollutionStats();
				window.alert("Entrada eliminada con éxito");
			});
    }
	async function BorrarPollutions(){
        console.log("Deleting ending....");
        const res = await fetch("/api/v1/ending-stats/",
			{
				method: "DELETE"
			}).then(function (res){
				from = null;
				to = null;
				getPollutionStats();
				window.alert("Entradas elimidas con éxito");
			});
    }
	async function LoadPollutions(){
        console.log("Loading ending....");
        const res = await fetch("/api/v1/ending-stats/loadInitialData",
			{
				method: "GET"
			}).then(function (res){
				getPollutionStats();
				window.alert("Entradas cargadas con éxito");
			});
    }
	async function Errores(code){
        let msg;
        if(code == 400){
            msg = "La fecha inicial no puede ser menor a la fecha final"
        }
		if(code = 404){
			msg = "No existe dato."
		}
		if(code == 409){
            msg = "El dato "+newEnding.country+"/"+newEnding.year+" ya existe"
        }
        window.alert(msg)
            return;
    }
	async function mPFunction(page){
		let num;
        const res = await fetch(page,
			{
				method: "GET"
			});
			if(res.ok){
				const data = await res.json();
				mP = Math.floor(data.length/10);
				if(mP === data.length/10){
					mP = mP-1;
				}
        }
	}
	
</script>

<main>
   
    <h1>Ending manager</h1>

{#await ending}
loading
	{:then ending}
	
	<Table bordered>
		<thead>
			<tr>
				<th>Fecha inicial</th>
				<th>Fecha final</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input type="number" min="2000" bind:value="{from}"></td>
				<td><input type="number" min="2000" bind:value="{to}"></td>
				<td align="center"><Button outline color="dark" on:click="{()=>{
					if (from == null || to == null) {
						window.alert('Los campos fecha inicial y fecha final no pueden estar vacíos')
					}else{
						getPollutionStats();
					}
				}}">
					Buscar
					</Button> 
				</td>
				<td align="center"><Button outline color="info" on:click="{()=>{
					from = null;
					to = null;
					getPollutionStats();
					
				}}">
					Limpiar Búsqueda
					</Button>
				</td>
				
			</tr>
		</tbody>
	</Table>

	<Table bordered>
		<thead>
			<tr>
				<th>País</th>
				<th>Año</th>
				<th>Mujer</th>
				<th>Hombre</th>
                <th>Media</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input bind:value="{newEnding.country}"></td>
				<td><input type="number" bind:value="{newEnding.year}"></td>
				<td><input type="number" bind:value="{newEnding.women}"></td>
                <td><input type="number" bind:value="{newEnding.men}"></td>
                <td><input type="number" bind:value="{newEnding.average}"></td>
				<td><Button outline color="primary" on:click="{insertPollution}">
					Añadir
					</Button>
				</td>
			</tr>
			{#each ending as end}
				<tr>
					<td>{end.country}</td>
					<td>{end.year}</td>
					<td>{end.women}</td>
                    <td>{end.men}</td>
                    <td>{end.average}</td>
					<td><Button outline color="warning" on:click={function (){
						window.location.href = `/#/ending-stats/${end.country}/${end.year}`
					}}>
						Editar
					</Button>
					<td><Button outline color="danger" on:click={BorrarPollution(end.country,end.year)}>
						Borrar
					</Button>
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>
	<div align="center">
		{#each Array(mP+1) as _,p}
		
			<Button outline color="secondary" on:click={()=>{
				offset = p;
				getPollutionStats();
			}}>{p} </Button>
		{/each}
	</div>
	<br>
	<div align="center">
		<Button outline color="success" on:click={LoadPollutions}>
			Cargar datos
		</Button>
		<Button outline color="danger" on:click={BorrarPollutions}>
			Borrar todo
		</Button>
		<a href="/#/graphSGB">
			<button outline color="secondary">Gráfica</button>
		</a>
		
	</div>
	<br>
	<div align="center">
		<Button color="outline-dark" on:click={function (){window.location.href = `/`}}>Volver</Button>
	</div>
	
{/await}

</main>