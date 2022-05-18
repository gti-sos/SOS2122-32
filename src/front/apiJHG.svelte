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
	let from = null;
	let to = null;
	let offset = 0;
	let limit = 10;
	let mP = 0;
	let visible = false;
	let visibleOk = false;
    onMount(getHousework);
    async function getHousework(){
        console.log("Fetching ending...");
		let page = `/api/v1/housework-stats?limit=${limit}&&offset=${offset*10}&&`;
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
            housework = data;
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

    async function gethouseworkInicial() {
		console.log("Fetching ending...");
		const res = await fetch("/api/v1/housework-stats/loadInitialData").then(
			function (res) {
				window.alert("Datos cargados");
				getHousework();
			}
		);
		housework = await res.json();
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
			if(res.ok){
				getHousework();
				window.alert("Entrada introducida con éxito");
		}else{
			Errores(res.status);
		}
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
			window.alert("Eliminado");
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
			window.alert("Datos eliminados");
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
					getHousework();
				}
			}}">
				Buscar
				</Button> 
			</td>
			<td align="center"><Button outline color="info" on:click="{()=>{
				from = null;
				to = null;
				getHousework();
				
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
                            <Button outline color="warning" on:click={function (){
								window.location.href = `/#/housework-stats/${h.country}/${h.year}`
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
			getHousework();
		}}>{p} </Button>
	{/each}
</div>
<br>
<div align="center">
	<Button outline color="success" on:click={gethouseworkInicial}>
		Cargar datos
	</Button>
	<Button outline color="danger" on:click={eliminarDatos}>
		Borrar todo
	</Button>
	<Button outline color="secondary" on:click={function (){
		window.location.href = `/#/graphJHG`;
	}}>Gráfica Plotly</Button>
	<Button outline color="secondary" on:click={function (){
		window.location.href = `/#/graphJHGv2`;
	}}>Gráfica Highcharts</Button>
</div>
{/await}
</main>