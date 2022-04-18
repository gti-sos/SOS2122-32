<script>
	import Router from "svelte-spa-router";
	import ApiJHG from "./ApiJHG.svelte";
	import Home from "./Home.svelte";
	import ApiRMA from "./ApiRMA.svelte";


	const routes={
		'/' : Home,
		'/apiJHG': ApiJHG,
		'/ApiRMA': ApiRMA

	};

</script>

<main>
	<Router {routes}/>
</main>
