<script>
	import Router from "svelte-spa-router";
	import apiJHG from "./apiJHG.svelte";
	import Home from "./Home.svelte";
	import ApiRMA from "./rafmolalv/ApiRMA.svelte";
	import EditApiSGB from "./editApiSGB.svelte";
	import EditApiJHG from "./EditApiJHG.svelte";
	import EditApiRMA from "./rafmolalv/EditApiRMA.svelte";
	import Info from "./Info.svelte";
	import ApiSgb from "./apiSGB.svelte";
	import Mygraph from "./Mygraph.svelte";
	import MygraphJHG from "./MygraphJHG.svelte";
	import MygraphRma from "./rafmolalv/MygraphRMA.svelte";
	import MygraphSGB from "./MygraphSGB.svelte";
	import MygraphJHGv2 from "./MygraphJHGv2.svelte";
	import Integracion1RMA from "./rafmolalv/PublicExpenditureGraph.svelte";




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
		"/graphRMA": MygraphRma,
		"/graphSGB": MygraphSGB,
		"/graphJHGv2": MygraphJHGv2,
		"/Integracion1RMA": Integracion1RMA

	};

</script>

<main>
	<Router {routes}/>
</main>
