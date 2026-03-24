<script lang="ts">
	import type World from "$lib/World";
	import CharacterIsland from "$lib/UI/PlayScreen/CharacterIsland.svelte";
	import { getEnemyEntity, getPlayerEntity } from "$lib/queries/CharacterQueries";
	import {getStateMachineCurrentState} from "$lib/queries/StateMachineQueries";
	import { roundStateMachine } from "$lib/stateMachines/stateMachines";
	import SendEventToStateMachinesCommand from "$lib/commands/SendEventToStateMachinesCommand";
	
  interface Props {
    world: World
  };

  let { world }: Props = $props();

  function engageFight() {
  	const command: SendEventToStateMachinesCommand = new SendEventToStateMachinesCommand();
  	command.execute(world.gameLoop!, null, 'FightEvent');
  }
</script>

<div class="w-full h-full flex flex-col items-center">
	<div class="w-full h-full flex flex-row items-center justify-between p-4 space-x-4">
		{#if ['Idle', 'Loading'].includes(getStateMachineCurrentState(world, roundStateMachine).currentState) === false}
			<CharacterIsland character={getPlayerEntity(world.gameLoop!)} {world} leftSide={true}/>
			<div>
				<button class="btn btn-lg preset-filled-primary-500" onclick={() => engageFight()}>Battle !</button>
			</div>
			<CharacterIsland character={getEnemyEntity(world.gameLoop!)} {world} leftSide={false}/>
		{/if}
	</div>
</div>
