<script lang="ts">
	import type World from "$lib/World";
	import SendEventToStateMachinesCommand from '$lib/commands/SendEventToStateMachinesCommand'
	import QuitGameCommand from '$lib/commands/QuitGameCommand'
	
  interface Props {
    world: World
  };

  let { world }: Props = $props();

	function handleClick(event: string){
    const command = new SendEventToStateMachinesCommand();
    command.execute(world.gameLoop!, null, event);

    if(event === 'QuitEvent') {
    	const quitCommand = new QuitGameCommand();
    	quitCommand.execute(world.gameLoop!, null, null);
    }
	}
  
</script>

<h1 class="h1">Pause</h1>
<button on:click={() => handleClick('ContinueEvent')}>Continue</button>
<button on:click={() => handleClick('QuitEvent')}>Menu</button>
