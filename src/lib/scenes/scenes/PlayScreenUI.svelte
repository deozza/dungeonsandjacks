<script lang="ts">
	import PauseEvent from "$lib/stateMachines/events/PauseEvent";
	import type World from "$lib/World";

  interface Props {
    world: World
  };

  let { world }: Props = $props();

	function handleClick(){
		world.listensToEvent(PauseEvent)
	}
  
</script>

<h1 class="h1">Playing</h1>
<button on:click={handleClick}>Pause</button>
