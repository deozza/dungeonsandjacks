<script lang="ts">
	import type { Entity } from "$lib/ECS/entities";
	import { getCardPile } from "$lib/queries/CharacterQueries";
	import type World from "$lib/World";
	import PlayingCard from "../PlayingCard.svelte";

  interface Props {
    character: Entity,
    world: World,
  };

  let { character, world }: Props = $props();
</script>

<div class="grid grid-cols-4 gap-x-4 -gap-y-4 justify-center">

	{#each getCardPile(world.gameLoop!, character, 'hand') as card}
	  <PlayingCard {card} />
	{/each}
</div>
