<script lang="ts">
	import type World from "$lib/World";
	import SendEventToStateMachineCommand from '$lib/commands/SendEventToStateMachinesCommand'

  interface Props {
    world: World
  };

  let { world }: Props = $props();

	function handleClick(){
    const command = new SendEventToStateMachineCommand();
    command.execute(world.gameLoop!, null, 'PlayEvent');
	}
  
</script>

<h1 class="h1">Main menu</h1>
<button onclick={handleClick}>Play</button>
