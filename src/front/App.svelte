<script>
	import Router from "svelte-spa-router";
	import apiJHG from "./apiJHG.svelte";
	import Home from "./Home.svelte";
	import ApiRMA from "./ApiRMA.svelte";
	import EditApiSGB from "./editApiSGB.svelte";
	import EditApiJHG from "./editApiJHG.svelte";
	import EditApiRMA from "./editApiRMA.svelte";
	import Info from "./Info.svelte";
	import ApiSgb from "./apiSGB.svelte";
	import Mygraph from "./Mygraph.svelte";
	import MygraphJHG from "./MygraphJHG.svelte";
	import MygraphRma from "./MygraphRMA.svelte";



	const routes={
		'/' : Home,
		'/apiJHG': apiJHG,
		'/ApiRMA': ApiRMA,
		'/apiSGB': ApiSgb,
		"/ending-stats/:country/:year": EditApiSGB, 
		"/housework-stats/:country/:year": EditApiJHG,
		"/repeaters-stats/:country/:year": EditApiRMA,
		'/info': Info,
		"/graph": Mygraph,
		"/graphJHG": MygraphJHG,
		"/graphRMA": MygraphRma

	};

</script>

<main>
	<Router {routes}/>
</main>
