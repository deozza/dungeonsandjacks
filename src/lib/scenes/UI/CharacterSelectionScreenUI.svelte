<script lang="ts">
	import SendEventToStateMachineCommand from '$lib/commands/SendEventToStateMachinesCommand'
	import type World from "$lib/World";
	import { characters } from '$lib/configs/characters/playables/index';
	import CharacterSheet from "$lib/UI/CharacterSheet.svelte";
	import PlayerBuilder from '$lib/builders/CharacterBuilder/PlayerBuilder';

  interface Props {
    world: World
  };

  let { world }: Props = $props();

	function handleClick(playableCharacter){
		const playerBuilder: PlayerBuilder = new PlayerBuilder();
		playerBuilder.gameLoop = world.gameLoop;

		playerBuilder.build(playableCharacter)
		
    const command = new SendEventToStateMachineCommand();
    command.execute(world.gameLoop!, null, 'SelectCharacterEvent');
	}
  
</script>

<div class="w-full h-full flex flex-col items-center">
	<h1 class="h1 mt-4">Select your character</h1>
	<div class="flex flex-col items-center justify-center h-full w-full">
		<div class="flex flex-row items-center justify-center space-x-4 h-96 w-full">
			{#each characters as character}
				<CharacterSheet {character} onclick={() => handleClick(character)} />
			{/each}
		</div>
	</div>
</div>
