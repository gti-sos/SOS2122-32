<script>
	import Router from "svelte-spa-router";
	import ApiJHG from "./ApiJHG.svelte";
	import Home from "./Home.svelte";
	import ApiRMA from "./ApiRMA.svelte";
	import EditApiSGB from "./editApiSGB.svelte";
	import EditApiJHG from "./editApiJHG.svelte";
	import EditApiRMA from "./editApiRMA.svelte";
	import Info from "./Info.svelte";
	import ApiSgb from "./apiSGB.svelte";



	const routes={
		'/' : Home,
		'/apiJHG': ApiJHG,
		'/ApiRMA': ApiRMA,
		'/apiSGB': ApiSgb,
		"/ending-stats/:country/:year": EditApiSGB, 
		"/housework-stats/:country/:year": EditApiJHG,
		"/repeaters-stats/:country/:year": EditApiRMA,
		'/info': Info

	};

</script>

<main>
	<Router {routes}/>
</main>
