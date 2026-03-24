
<script lang="ts">
	import type { Entity } from "$lib/ECS/entities";
	import { getCharacterHealth } from "$lib/queries/CharacterQueries";
	import type World from "$lib/World";
	import { Progress } from "@skeletonlabs/skeleton-svelte";
	import { bounceOut } from "svelte/easing";
	import { fly } from "svelte/transition";

  interface Props {
    character: Entity,
    world: World
  };

  let {world, character}: Props = $props();
</script>

<div class="flex flex-col items-center justify-start">
	<span class="text-2xl">{getCharacterHealth(world.gameLoop!, character).currentHealth}/{getCharacterHealth(world.gameLoop!, character).maxHealth}</span>
	{#key getCharacterHealth(world.gameLoop!, character).currentHealth}
		<div class="w-full" in:fly={{ x: 50, duration: 200, easing: bounceOut, opacity: 1 }}>
			<Progress value={getCharacterHealth(world.gameLoop!, character).currentHealth} max={getCharacterHealth(world.gameLoop!, character).maxHealth}>
			  <Progress.Track>
			    <Progress.Range class="bg-success-500" />
			  </Progress.Track>
			</Progress>
		</div>
	{/key}
</div>
