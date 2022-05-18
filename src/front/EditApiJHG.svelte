<script>
    export let params = {};
    import {pop} from "svelte-spa-router";
    import { onMount } from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import Table from 'sveltestrap/src/Table.svelte';

    let ending = {};

    let updatedCountry;
    let updatedYear;
    let updatedWomen;
    let updatedMen;
    let updatedAverage;
    
    onMount(getrepeaters);
    async function getrepeaters(){
        console.log("Fetching ending....");
        const res = await fetch("/api/v1/housework-stats/"+params.country+"/"+params.year);
        if(res.ok){
            const data = await res.json();
            ending = data;
            updatedCountry = ending.country;
            updatedYear = ending.year;
            updatedWomen = ending.women;
            updatedMen = ending.men;
            updatedAverage = ending.average;
        }else{
            getrepeaters();
        }
    }
    async function EditEnding(){
        console.log("Updating ending...."+updatedCountry);
        const res = await fetch("/api/v1/housework-stats/"+params.country+"/"+params.year,
			{
				method: "PUT",
				body: JSON.stringify({
                    country: updatedCountry,
                    year: updatedYear,
                    women: updatedWomen,
                    men: updatedMen,
                    average: updatedAverage
                }),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function(res){
                Errores(res.status);
                getrepeaters();
            }); 
    }
    async function Errores(code){
        
        let msg;
        if(code == 404){
            msg = "La entrada seleccionada no existe"
        }
        if(code == 400){
            msg = "La petición no está correctamente formulada"
        }
        if(code == 409){
            msg = "El dato introducido ya existe"
        }
        if(code == 401){
            msg = "No autorizado"
        }
        if(code == 405){
            msg = "Método no permitido"
        }if(code == 201){
            msg = "Actualizado"
        }
        window.alert(msg)
            return;
    }
</script>

<main>
    <h1>Editar entrada "{params.country}"/"{params.year}"</h1>
    {#await ending}
    loading
        {:then ending}
        
    
        <Table bordered>
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Mujer</th>
                    <th>Hombre</th>
                    <th>Media</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td><input type="number" min="0" bind:value="{updatedWomen}"></td>
                    <td><input type="number" min="0" bind:value="{updatedMen}"></td>
                    <td><input type="number" min="0" bind:value="{updatedAverage}"></td>
                    <td><Button outline color="primary" on:click="{EditEnding}">
                        Editar
                        </Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    {/await}
    
    <Button outline color="secondary" on:click="{pop}">Volver</Button>

    </main>