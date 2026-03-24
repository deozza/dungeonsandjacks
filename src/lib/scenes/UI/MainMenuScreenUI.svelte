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

<div class="w-full h-full flex flex-col items-center justify-center space-y-8">
	<h1 class="h1">Main menu</h1>
	<button onclick={handleClick} class="btn btn-lg preset-outlined-primary-500 hover:preset-filled-primary-500" >New game</button>
</div>
