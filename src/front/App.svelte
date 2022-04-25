<script>
	import Router from "svelte-spa-router";
	import ApiJHG from "./ApiJHG.svelte";
	import Home from "./Home.svelte";
	import ApiRMA from "./ApiRMA.svelte";
	import EditApiSGB from "./editApiSGB.svelte";
	
	import Info from "./Info.svelte";
	import ApiSgb from "./apiSGB.svelte";



	const routes={
		'/' : Home,
		'/apiJHG': ApiJHG,
		'/ApiRMA': ApiRMA,
		'/apiSGB': ApiSgb,
		"/ending-stats/:country/:year": EditApiSGB, 
		'/info': Info

	};

</script>

<main>
	<Router {routes}/>
</main>
