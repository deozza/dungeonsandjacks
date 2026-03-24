<script lang="ts">
	import SendEventToStateMachinesCommand from "$lib/commands/SendEventToStateMachinesCommand";
	import type World from "$lib/World";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

  interface Props {
    world: World
  };

  let { world }: Props = $props();
	let count = $state(0);
	
  onMount(() => {
  	count = 0;
    requestAnimationFrame(update);
  	
  })

  function update() {
    count++;
		requestAnimationFrame(update);
  }
  
	function handleClick(){
	  if(count <= 180) {
	    return;
	  }
    const command = new SendEventToStateMachinesCommand();
    command.execute(world.gameLoop!, null, 'ContinueEvent');
	}
</script>

<svelte:window onkeydown={() => handleClick()} onclick={() => handleClick()} />

<div class="w-full h-full flex flex-col items-center justify-center space-y-8">
  <h1 class="h1">Splash screen</h1>
  {#if count >= 120}
  	<p in:fade class="text-xl text-primary-500 hover:cursor-pointer">Click here or press any button to continue</p>
  {/if}
</div>
