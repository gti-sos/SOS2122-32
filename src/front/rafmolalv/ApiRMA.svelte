<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	var BASE_API_PATH = "/api/v2/repeaters-stats";

	let repeaters = [];
	let newDato = {
		country: "",
		year: "",
		women: "",
		men: "",
		average: "",
	};
    let errorMsg = "";
	let okMsg = "";
	let from = null;
	let to = null;
	let offset = 0;
	let limit = 10;
	let mP = 0;
	let visible = false;
	let visibleOk = false;
	onMount(getrepeaters);

	async function getrepeaters(){
        console.log("Fetching ending...");
		let page = `/api/v2/repeaters-stats?limit=${limit}&&offset=${offset*10}&&`;
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
            repeaters = data;
        }else{
			Errores(res.status);
		}
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

	async function Errores(code){
        let msg;
        if(code == 400){
            msg = "Datos incorrectos"
        }
		if(code == 404){
			msg = "No existe dato."
		}
		if(code == 409){
            msg = "El dato "+newDato.country+"/"+newDato.year+" ya existe"
        }
        window.alert(msg)
            return;
    }

	

	
	async function getrepeatersInicial() {
		console.log("Fetching ending...");
		const res = await fetch("/api/v2/repeaters-stats/loadInitialData").then(
			function (res) {
				window.alert("Datos cargados");
				getrepeaters();
			}
		);
		repeaters = await res.json();
		console.log("Recevider: " + repeaters.length);
	}

	async function insertDato() {
		console.log("Inserting: " + JSON.stringify(newDato));
		const res = await fetch("/api/v2/repeaters-stats", {
			method: "POST",
			body: JSON.stringify(newDato),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(function (res) {
			if(res.ok){
				getrepeaters();
				window.alert("Entrada introducida con éxito");
		}else{
			Errores(res.status);
		}
		});
		console.log("Done");
	}

	async function eliminarDatos() {
		console.log("Deleting: " + JSON.stringify(newDato));
		const res = await fetch("/api/v2/repeaters-stats", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(function (res) {
			getrepeaters();
			window.alert("Datos eliminados");

		});
		console.log("Done");
	}

	async function eliminarDato(country,year) {
		console.log("Deleting: " + JSON.stringify(newDato));
		const res = await fetch("/api/v2/repeaters-stats/"+country+"/"+year, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(function (res) {
			getrepeaters();
			window.alert("Eliminado");

		});
		console.log("Done");
	}

    
</script>

<main>
	{#await repeaters}
		loading
	{:then repeaters}
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
						getrepeaters();
					}
				}}">
					Buscar
					</Button> 
				</td>
				<td align="center"><Button outline color="info" on:click="{()=>{
					from = null;
					to = null;
					getrepeaters();
					
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
					<th> Pais </th>
					<th> Año </th>
					<th> Mujer </th>
					<th> Hombre </th>
					<th> Media </th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input bind:value={newDato.country} /></td>
					<td><input bind:value={newDato.year} /></td>
					<td><input bind:value={newDato.women} /></td>
					<td><input bind:value={newDato.men} /></td>
					<td><input bind:value={newDato.average} /></td>
					<td
						><Button outline color="primary" on:click={insertDato}
							>Insertar</Button
						></td
					>
				</tr>
				{#each repeaters as rep}
					<tr>
						<td>{rep.country}</td>
						<td>{rep.year}</td>
						<td>{rep.women}</td>
						<td>{rep.men}</td>
						<td>{rep.average}</td>
						<td><Button outline color= "primary" on:click={eliminarDato(rep.country,rep.year)}>Eliminar</Button>
                            <Button outline color= "warning" on:click={function (){
								window.location.href = `/#/repeaters-stats/${rep.country}/${rep.year}`
							}}>
								Editar
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
					getrepeaters();
				}}>{p} </Button>
			{/each}
		</div>
		<br>
		<Button color="outline-dark" on:click={function (){window.location.href = `/`}}>Volver</Button>

		<div align="center">
			<td><Button outline color="primary" on:click={getrepeatersInicial}>Cargar datos</Button></td>
			<td><Button outline color="primary" on:click={eliminarDatos}>Eliminar datos</Button></td>
			<td><Button outline color="primary" on:click={function (){window.location.href = `/#/graphRMA`}}>Gráfica 1</Button></td>
			<td><Button outline color="primary" on:click={function (){window.location.href = `/#/graphRMA2`}}>Gráfica 2</Button></td>

		</div>
		

	{/await}
</main>
