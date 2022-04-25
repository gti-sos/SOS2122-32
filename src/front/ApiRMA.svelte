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
	let visible = false;
	let visibleOk = false;
	let offset1 = 0;
	let offset2 = 0;
	let limit = 10;
	let page = 1;
	let lastPage = 1;
	let total = 0;
	let from = null;
	let to = null;
	onMount(getrepeaters2);

	async function getrepeaters() {
		console.log("Fetching entries....");
		let cadena = `/api/v2/repeaters-stats?from=${from}&&to=${to}&&`;
		const res = await fetch(cadena);
		if (res.ok) {
			const data = await res.json();
			repeaters = data;
			console.log("Received entries: " + repeaters.length);
		} else {
			console.log("Error");
		}
	}

	async function getrepeaters2() {
		console.log("Fetching entries....");
		let cadena =
			"/api/v2/repeaters-stats?limit=" + limit + "&offset=" + offset1;
		const res = await fetch(cadena);
		if (res.ok) {
			//let cadenaPag = cadena.split("?limit=" + limit + "&offset=" + offset1);
			paginacion();
			const data = await res.json();
			repeaters = data;
			console.log("Received entries: " + repeaters.length);
		}
	}

	async function paginacion() {
		const data = await fetch(BASE_API_URL + "/repeaters-stats");
		if (data.status == 200) {
			const json = await data.json();
			total = json.length;
			cambiapag(page, offset1);
		}
	}

	function cambiapag(page1, offset2) {
		lastPage = Math.ceil(total / 10);
		console.log("Last page = " + lastPage);
		if (page1 !== page) {
			offset1 = offset2;
			page = page1;
			getrepeaters2();
			getrepeaters();
		}
	}
	async function getrepeatersInicial() {
		console.log("Fetching ending...");
		const res = await fetch("/api/v2/repeaters-stats/loadInitialData").then(
			function (res) {
				getrepeaters2();
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
			getrepeaters();
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
		});
		console.log("Done");
	}

    async function editarDato(name) {
		console.log("Inserting: " + JSON.stringify(newDato));
		const res = await fetch("/api/v2/repeaters-stats/"+name, {
			method: "PUT",
            body: JSON.stringify(newDato),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(function (res) {
			getrepeaters();
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
                            <Button outline color= "primary" on:click={editarDato(rep.country)}>Editar</Button>
                        </td>
					</tr>
				{/each}
			</tbody>
		</Table>
		<td><Button outline color="primary" on:click={getrepeatersInicial}>Cargar datos</Button></td>
		<td><Button outline color="primary" on:click={eliminarDatos}>Eliminar datos</Button></td>

	{/await}
</main>
