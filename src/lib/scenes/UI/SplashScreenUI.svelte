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
    const command = new SendEventToStateMachinesCommand();
    command.execute(world.gameLoop!, null, 'ContinueEvent');
	}
</script>

<h1 class="h1">Splash screen</h1>
{#if count >= 120}
	<button on:click={() => handleClick()} in:fade>Continue</button>
{/if}
