<script>
    import{onMount} from 'svelte';
    import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

    var BASE_API_PATH = "/api/v1/housework-stats";

    let housework=[];
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
    onMount(getHousework);
    async function getHousework(){
        console.log("Fetching ending...");
        const res = await fetch("/api/v1/housework-stats")
        housework=await res.json();
    }

    async function gethouseworkInicial() {
		console.log("Fetching ending...");
		const res = await fetch("/api/v1/housework-stats/loadInitialData").then(
			function (res) {
				getHousework();
			}
		);
		repeaters = await res.json();
		console.log("Recevider: " + housework.length);
	}

    async function insertDato() {
		console.log("Inserting: " + JSON.stringify(newDato));
		const res = await fetch("/api/v1/housework-stats", {
			method: "POST",
			body: JSON.stringify(newDato),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(function (res) {
			getHousework();
		});
		console.log("Done");
	}

    async function eliminarDato(country,year) {
		console.log("Inserting: " + JSON.stringify(newDato));
		const res = await fetch("/api/v1/housework-stats/"+country+"/"+year, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(function (res) {
			getHousework();
		});
		console.log("Done");
	}

    async function editarDato(name) {
		console.log("Inserting: " + JSON.stringify(newDato));
		const res = await fetch("/api/v1/housework-stats/"+name, {
			method: "PUT",
            body: JSON.stringify(newDato),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(function (res) {
			getHousework();
		});
		console.log("Done");
	}

    async function eliminarDatos() {
		console.log("Inserting: " + JSON.stringify(newDato));
		const res = await fetch("/api/v1/housework-stats", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(function (res) {
			getHousework();
		});
		console.log("Done");
	}
	
</script>
<main>
{#await housework}
loading
{:then housework}

<Table bordered>
	<thead>
		<tr>
			<th>
				País
			</th>
			<th>
				Año
			</th>
			<th>
				Mujeres
			</th>
			<th>
				Hombres
			</th>
			<th>
				Media
			</th>
            <th>Acciones</th>
		</tr>
	</thead>
	<tbody>
			<tr>
				<td><input bind:value={newDato.country} /></td>
					<td><input bind:value={newDato.year} /></td>
					<td><input bind:value={newDato.women} /></td>
					<td><input bind:value={newDato.men} /></td>
					<td><input bind:value={newDato.average} /></td>
					<td><Button outline color="primary" on:click={insertDato}>Insertar</Button></td>
			</tr>
            {#each housework as h}
					<tr>
						<td>{h.country}</td>
						<td>{h.year}</td>
						<td>{h.women}</td>
						<td>{h.men}</td>
						<td>{h.average}</td>
                        <td><Button outline color= "primary" on:click={eliminarDato(h.country,h.year)}>Eliminar</Button>
                            <Button outline color= "primary" on:click={editarDato(h.country)}>Editar</Button>
                        </td>
					</tr>
				{/each}
	</tbody>
</Table>
<td><Button outline color="primary" on:click={gethouseworkInicial}>Cargar datos</Button></td>
<td><Button outline color="primary" on:click={eliminarDatos}>Eliminar datos</Button></td>
{/await}
</main>