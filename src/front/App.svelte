<script>
	import Router from "svelte-spa-router";
	import ApiJHG from "./ApiJHG.svelte";
	import Home from "./Home.svelte";
	import ApiRMA from "./ApiRMA.svelte";
	import Info from "./Info.svelte";



	const routes={
		'/' : Home,
		'/apiJHG': ApiJHG,
		'/ApiRMA': ApiRMA,
		'/info': Info

	};

</script>

<main>
	<Router {routes}/>
</main>
