<script>
	import Button from "sveltestrap/src/Button.svelte";
</script>
<main>
    <b>Integraciones Javier Hidalgo García:</b>
<Button outline color="secondary" on:click={function (){
    window.location.href = `/#/graphJHG`;
}}>Gráfica Plotly</Button>
<Button outline color="secondary" on:click={function (){
    window.location.href = `/#/graphJHGv2`;
}}>Gráfica Highcharts</Button>
<Button outline color="secondary" on:click={function (){
    window.location.href = `/#/graphCo2Stats`;
}}>Gráfica SOS-22</Button>
<Button outline color="secondary" on:click={function (){
    window.location.href = `/#/graphRegistrationStats`;
}}>Gráfica SOS-31</Button>
<Button outline color="secondary" on:click={function (){
    window.location.href = `/#/graphExternalAPI`;
}}>Gráfica ExternalAPI1</Button>
<Button outline color="secondary" on:click={function (){
    window.location.href = `/#/graphExternalAPI2`;
}}>Gráfica ExternalAPI2</Button>
</main>