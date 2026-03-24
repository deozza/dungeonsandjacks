<script lang="ts">
	import type { Entity } from "$lib/ECS/entities";
	import { getCharacterName } from "$lib/queries/CharacterQueries";
	import type World from "$lib/World";

  interface Props {
    character: Entity,
    world: World
  };

  let {world, character}: Props = $props();
</script>

<h2 class="h2">{getCharacterName(world.gameLoop!, character).content}</h2>
