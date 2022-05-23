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
<br>
<br>
<br>
<b>Integraciones Rafael Molino Alvarez:</b>
<Button outline color="secondary" on:click={function (){
    window.location.href = `/#/graphRMA`;
}}>Gráfica ApexChart</Button>
<Button outline color="secondary" on:click={function (){
    window.location.href = `/#/graphRMA2`;
}}>Gráfica Highchart</Button>
<Button outline color="secondary" on:click={function (){
    window.location.href = `/#/Integracion1RMA`;
}}>Public expenditure stats</Button>
<Button outline color="secondary" on:click={function (){
    window.location.href = `/#/Integracion2RMA`;
}}>Energy Consumption stats</Button>
<Button outline color="secondary" on:click={function (){
    window.location.href = `/#/ApiExterna1`;
}}>Api Externa 1</Button>
<Button outline color="secondary" on:click={function (){
    window.location.href = `/#/ApiExterna2`;
}}>Api Externa 2</Button>
<Button outline color="secondary" on:click={function (){
    window.location.href = `/#/ApiExterna3`;
}}>Api Externa 3</Button>
<Button outline color="secondary" on:click={function (){
    window.location.href = `/#/ApiExterna4`;
}}>Api Externa 4</Button>
<br>
<br>
<br>
<Button color="outline-dark" on:click={function (){window.location.href = `/`}}>Volver</Button>

</main>