<script lang="ts">
	import NameComponent from "$lib/ECS/components/NameComponent";
	import SendEventToStateMachineCommand from '$lib/commands/SendEventToStateMachinesCommand'
	import type World from "$lib/World";

  interface Props {
    world: World
  };

  let { world }: Props = $props();

	function handleClick(){
    const command = new SendEventToStateMachineCommand();
    command.execute(world.gameLoop!, null, 'PauseEvent');
	}

	function getPlayerInfos() {
		return world.gameLoop?.getComponentFromEntity(NameComponent, world.gameLoop.getEntitiesByComponents(new Set<Function>([NameComponent]))[0]);
	}
  
</script>

<h1 class="h1">Playing</h1>
<p>{getPlayerInfos().content}</p>
<button on:click={handleClick}>Pause</button>
