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
	onMount(getrepeaters);

	async function getrepeaters() {
		console.log("Fetching ending...");
		const res = await fetch("/api/v2/repeaters-stats");
		repeaters = await res.json();
		console.log("Recevider: " + repeaters.length);
	}
	async function getrepeatersInicial() {
		console.log("Fetching ending...");
		const res = await fetch("/api/v2/repeaters-stats/loadInitialData").then(
			function (res) {
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
