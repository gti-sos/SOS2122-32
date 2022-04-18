<script>
	import { onMount } from "svelte";
    var BASE_API_PATH = "/api/v1/repeaters-stats";

	let repeaters = [];
	onMount(getrepeaters);

	async function getrepeaters() {
		console.log("Fetching ending...");
		const res = await fetch("/api/v1/repeaters-stats");
		repeaters = await res.json();
		console.log("Recevider: " + repeaters.length);
	}

	
</script>

<main>
	{#await repeaters}
		loading
	{:then repeaters}
		<table>
			<thead>
				<tr>
					<th> Country </th>
					<th> Year </th>
					<th> Women </th>
					<th> Men </th>
					<th> Average </th>
				</tr>
			</thead>
			<tbody>
				{#each repeaters as rep}
					<tr>
						<td>{rep.country}</td>
						<td>{rep.year}</td>
						<td>{rep.women}</td>
						<td>{rep.men}</td>
						<td>{rep.average}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		


	{/await}
</main>
