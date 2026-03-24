<script lang="ts">
	import CardPile from "../CardPile.svelte";
	import type World from "$lib/World";
	import type { Entity } from "$lib/ECS/entities";
	import CharacterName from "./CharacterName.svelte";
	import CharacterHealthBar from "./CharacterHealthBar.svelte";
	import { getHandValue, hasBustedHand } from "$lib/queries/CharacterQueries";
	import CharacterHandPile from "./CharacterHandPile.svelte";
  
  interface Props {
    character: Entity,
    world: World,
    leftSide: boolean
  };

  let { character, world, leftSide = true }: Props = $props();

</script>


<div class="flex flex-col items-center justify-center space-y-8 w-6/12">
	<div class="flex flex-col items-center justify-start space-y-4 w-full">
	  <CharacterName {character} {world} />
	  <CharacterHealthBar {character} {world} />
	</div>
	<div
		class="flex flex-row items-center space-x-4 w-full"
		class:justify-start={leftSide}
		class:justify-end={leftSide === false}
	>
		<div class="flex flex-col items-center justify-start space-y-2">
			<CardPile {character} {world} pileType={'deck'} />
			<CardPile {character} {world} pileType={'discard'} />
		</div>

		<div class="flex flex-col items-center justify-start space-y-2">
			{#if getHandValue(world.gameLoop!, character) > 0 }
				<p class="text-lg text-primary-500">{getHandValue(world.gameLoop!, character)}</p>
			{/if}
			<CharacterHandPile {world} {character} />
		</div>
		{#if hasBustedHand(world.gameLoop!, character) === true}
			<p>busted hand</p>
		{/if}
	</div>
</div>
