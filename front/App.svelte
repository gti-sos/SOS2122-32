<script>
	import Router from "svelte-spa-router";
	import ApiJHG from "./ApiJHG.svelte";
	import Home from "./Home.svelte";
	import ApiRMA from "./ApiRMA.svelte";

	export let name;

	const routes={
		'/' : Home,
		'/apiJHG': ApiJHG
	};

</script>

<main>
	<Router {routes}/>
</main>
