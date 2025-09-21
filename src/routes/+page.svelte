<script lang="ts">
	import SceneHandler from '$lib/scenes/scenes/SceneHandler.svelte';
	import ContinueEvent from '$lib/stateMachines/events/ContinueEvent';
	import World from '$lib/World';
	import { onMount } from 'svelte';

	let world = new World();
	
  let count = 0; 
  
  onMount(() =>  {
  	world.load();
    requestAnimationFrame(update);
  })
  
  function update() {
    if(count === 120) {
      world.listensToEvent(ContinueEvent)
    }

    world.update()
    world = world;
    count++;
    
		requestAnimationFrame(update);
  }
  
  function onKeyUp(e) {
	}

</script>

<div class="flex flex-row justify-center align-center items-center w-full h-screen">
  <div class="flex flex-row justify-center align-center items-center h-[80vh] w-10/12 bg-white">
    <SceneHandler {world} />
  </div>
</div>

<style>
</style>
<svelte:window on:keyup|preventDefault={onKeyUp} />
