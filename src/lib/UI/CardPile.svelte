<script lang="ts">
	import DrawCardCommand from "$lib/commands/DrawCardCommand";
	import type { Entity } from "$lib/ECS/entities";
	import { checkCardPileIsNotClickable, getCardPile } from "$lib/queries/CharacterQueries";
	import type World from "$lib/World";

  interface Props {
    character: Entity,
    world: World,
    pileType: string
  };

  let { character, world, pileType }: Props = $props();
  
	function clickAction(): void {
		if(checkCardPileIsNotClickable(world.gameLoop!, character, pileType)) {
			return;
		}
		
		if(pileType === 'deck') {
			const drawCardCommand: DrawCardCommand = new DrawCardCommand();
			drawCardCommand.execute(world.gameLoop!, character, null);
		}
	}
</script>

<button onclick={() => clickAction()} disabled={checkCardPileIsNotClickable(world.gameLoop!, character, pileType)}>
	<div
		class="flex flex-col items-center justify-center rounded-xl card-hover bg-gradient-to-br from-primary-900 to-tertiary-900 h-32 w-24"
	>
		<span class="h4 font-semibold">
			{getCardPile(world.gameLoop!, character, pileType).length}
		</span>
	</div>
</button>
