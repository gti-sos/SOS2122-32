<script>
    import{onMount} from 'svelte';
        let housework=[];
    onMount(getHousework);
    
    async function getHousework(){
        console.log("Fetching ending...");
        const res = await fetch("/api/v1/housework-stats")
        housework=await res.json();
    }
</script>
<main>
{#await housework}
loading
{:then housework}

<table>
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
		</tr>
	</thead>
	<tbody>
		{#each housework as house}
			<tr>
				<td>{house.country}</td>
				<td>{house.year}</td>
				<td>{house.women}</td>
				<td>{house.men}</td>
				<td>{house.average}</td>
			</tr>
		{/each}
	</tbody>
</table>
{/await}
</main>