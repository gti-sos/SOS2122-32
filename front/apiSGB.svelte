<script>
    import{onMount} from 'svelte';
        let ending=[];
    onMount(getEnding);
    
    async function getEnding(){
        console.log("Fetching ending...");
        const res = await fetch("/api/v1/ending-stats")
        ending=await res.json();
    }
</script>
<main>
{#await ending}
loading
{:then ending}

<table>
	<thead>
		<tr>
			<th>
				Country
			</th>
			<th>
				Year
			</th>
			<th>
				Women
			</th>
			<th>
				Men
			</th>
			<th>
				Average
			</th>
		</tr>
	</thead>
	<tbody>
		{#each ending as ending}
			<tr>
				<td>{ending.country}</td>
				<td>{ending.year}</td>
				<td>{ending.women}</td>
				<td>{ending.men}</td>
				<td>{ending.average}</td>
			</tr>
		{/each}
	</tbody>
</table>
{/await}
</main>