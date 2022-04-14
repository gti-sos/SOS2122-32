<script>
import interfazJHG from './apiJHG.svelte';
export let name;
</script>

<main>
	<h1>SOS 2122-32</h1>
	<h2>Equipo</h2>
	<p><a href="https://github.com/javighidalgo01">Javier Hidalgo García</a></p> 
	<p>Rafael Molino Alvarez</p>
	<p>Sergio Jesús García Blanco</p>
	<h2>Descripción del proyecto</h2>
	<p>Nuestras fuentes de información están orientadas a analizar la relación que existe entre el tiempo dedicado al trabajo doméstico, repetidores de primaria y la tasa de finalización de primaria globales.</p>
	<h2>Repositorio</h2>
	<p><a href="https://github.com/gti-sos/SOS2122-32">https://github.com/gti-sos/SOS2122-32 </a></p>
	<h2>URL</h2>
	<p><a href="http://sos2122-32.herokuapp.com/"> http://sos2122-32.herokuapp.com/</a></p>
	<h2>APIs</h2>
	<p>Javier Hidalgo García</p>
	<a href="http://sos2122-32.herokuapp.com/api/v1/housework-stats/docs"><button color="blue">API v1</button></a>
	<a href="/javhidgar/apiJHG.svelte"><button>Interfaz</button></a>
	<interfazJHG />
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