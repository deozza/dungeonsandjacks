<script lang="ts">
	import ContinueEvent from "$lib/stateMachines/events/ContinueEvent";
	import QuitEvent from "$lib/stateMachines/events/QuitEvent";
	import type World from "$lib/World";

  interface Props {
    world: World
  };

  let { world }: Props = $props();

	function handleClick(event: Function){
		world.listensToEvent(event)
	}
  
</script>

<h1 class="h1">Pause</h1>
<button on:click={() => handleClick(ContinueEvent)}>Continue</button>
<button on:click={() => handleClick(QuitEvent)}>Menu</button>
