<script>
	import ApiJHG from "./ApiJHG.svelte";
	import ApiRMA from "./ApiRMA.svelte";
	import ApiSGB from "./apiSGB.svelte"


</script>

<main>
	<h1>SOS2122-32</h1>
	<h2>Equipo</h2>
	<p><a href="https://github.com/javighidalgo01">Javier Hidalgo García</a></p>
	<p><a href="https://github.com/rafamolino">Rafael Molino Alvarez</a></p>
	<p><a href="https://github.com/sergarbla">Sergio Jesús García Blanco</a></p>
	<h2>Descripción del proyecto</h2>
	<p>
		Nuestras fuentes de información están orientadas a analizar la relación
		que existe entre el tiempo dedicado al trabajo doméstico, repetidores de
		primaria y la tasa de finalización de primaria globales.
	</p>
	<h2>Repositorio</h2>
	<p>
		<a href="https://github.com/gti-sos/SOS2122-32"
			>https://github.com/gti-sos/SOS2122-32
		</a>
	</p>
	<h2>URL</h2>
	<p>
		<a href="http://sos2122-32.herokuapp.com/">
			http://sos2122-32.herokuapp.com/</a
		>
	</p>
	<h2>APIs</h2>
	<p>Javier Hidalgo García</p>
	<a href="http://sos2122-32.herokuapp.com/api/v1/housework-stats/docs"
		><button color="blue">API v1</button></a
	>
	<a href="/#/ApiJHG"><button>Interfaz</button></a>
	<a href="/api/v1/housework-stats"><button>Backend</button></a>
	<p>Rafael Molino Alvarez</p>
	<a href="http://sos2122-32.herokuapp.com/api/v1/repeaters-stats/docs"
		><button color="blue">API v1</button></a
	>
	<a href="/#/ApiRMA"><button>Interfaz</button></a>
	<a href="/api/v2/repeaters-stats"><button>Backend</button></a>
	<p>Sergio Jesús García Blanco</p>
	<a href="http://sos2122-32.herokuapp.com/api/v1/ending-stats/docs"
		><button color="blue">API v1</button></a
	>
	<a href="/#/ApiSGB"><button>Interfaz</button></a>
	<a href="/api/v2/ending-stats"><button>Backend</button></a>
	
	<h2>Gráfica</h2>
	<a href="/#/Graph"><button>Gráfica</button></a>
	

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
