<script>
	import Router from "svelte-spa-router";
	import apiJHG from "./apiJHG.svelte";
	import Home from "./Home.svelte";
	import ApiRMA from "./rafmolalv/ApiRMA.svelte";
	import EditApiSGB from "./sergarbla/editApiSGB.svelte";
	import EditApiJHG from "./EditApiJHG.svelte";
	import EditApiRMA from "./rafmolalv/EditApiRMA.svelte";
	import Info from "./Info.svelte";
	import ApiSgb from "./sergarbla/apiSGB.svelte";
	import Mygraph from "./Mygraph.svelte";
	import MygraphJHG from "./MygraphJHG.svelte";
	import MygraphRma from "./rafmolalv/MygraphRMA.svelte";
	import MygraphRma2 from "./rafmolalv/MygraphRMA2.svelte";
	import MygraphSGB from "./sergarbla/MygraphSGB.svelte";
	import MygraphSGB2 from "./sergarbla/MygraphSGB2.svelte";
	import MygraphJHGv2 from "./MygraphJHGv2.svelte";
	import Integracion1RMA from "./rafmolalv/PublicExpenditureGraph.svelte";
	import Integracion2RMA from "./rafmolalv/EnergyConsumptionGraph.svelte";
	import GraphelectricityConsumption from "./sergarbla/GraphelectricityConsumption.svelte";
	import Graphinmigrant from "./sergarbla/GraphInmigrant.svelte";
	import ApiExterna1 from "./rafmolalv/ApiExterna1.svelte";
	import ApiExterna2 from "./rafmolalv/ApiExterna2.svelte";
	import ApiExterna3 from "./rafmolalv/ApiExterna3.svelte";
	import ApiExterna4 from "./rafmolalv/ApiExterna4.svelte";
	import ExternalApi1 from "./sergarbla/ExternalApi1.svelte";
	import ExternalApi2 from "./sergarbla/ExternalApi2.svelte";
	import GraphCo2Stats from "./GraphCo2Stats.svelte";
	import GraphAirPollutionStats from "./GraphAirPollutionStats.svelte";
	import GraphExternalAPI1 from "./GraphExternalAPI1.svelte";
	import GraphExternalAPI2 from "./GraphExternalAPI2.svelte";
	import Integraciones from "./Integraciones.svelte";
	import Analytics from "./Analytics.svelte";
	import About from "./About.svelte";



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
		"/graphRMA2": MygraphRma2,
		"/graphSGB": MygraphSGB,
		"/graphSGB2": MygraphSGB2,
		"/graphJHGv2": MygraphJHGv2,
		"/Integracion1RMA": Integracion1RMA,
		"/Integracion2RMA": Integracion2RMA,
		"/Graphelectricity":GraphelectricityConsumption,
		"/Graphinmigrant":Graphinmigrant,
		"/ApiExterna1": ApiExterna1,
		"/ApiExterna2": ApiExterna2,
		"/ApiExterna3": ApiExterna3,
		"/ApiExterna4": ApiExterna4,
		"/ExternalApi1":ExternalApi1,
		"/ExternalApi2":ExternalApi2,
		"/graphCo2Stats": GraphCo2Stats,
		"/graphAirPollutionStats": GraphAirPollutionStats,
		"/graphExternalAPI": GraphExternalAPI1,
		"/graphExternalAPI2": GraphExternalAPI2,
		"/integrations": Integraciones,
		"/analytics": Analytics,
		"/about": About

	};

</script>

<main>
	<Router {routes}/>
</main>
