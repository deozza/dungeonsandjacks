<script lang="ts">
	import PlayerBuilder from "$lib/builders/PlayerBuilder/PlayerBuilder";
	import SendEventToStateMachineCommand from '$lib/commands/SendEventToStateMachinesCommand'
	import type World from "$lib/World";
	import villager from "$lib/configs/characters/playables/villager.json"
	import paladin from "$lib/configs/characters/playables/paladin.json"
	import mage from "$lib/configs/characters/playables/mage.json"

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

<div class="w-full h-full flex flex-col items-center justify-between">
	<h1 class="h1 mt-4">Select your character</h1>
	<div class="flex flex-row items-center justify-center space-x-4">
		<button on:click={() => handleClick(villager)}>Villager</button>
		<button on:click={() => handleClick(paladin)}>Paladin</button>
		<button on:click={() => handleClick(mage)}>Mage</button>
	</div>
</div>
