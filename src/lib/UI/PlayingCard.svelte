<script lang="ts">
	import CardRankComponent from "$lib/ECS/components/CardRankComponent";
	import type CardSuitComponent from "$lib/ECS/components/CardSuitComponent";
	import { fly } from "svelte/transition";

  interface Props {
    card: {cardRank: CardRankComponent, cardSuit: CardSuitComponent}
  };

  let { card }: Props = $props();
</script>
<div
	class="inline-flex bg-white drop-shadow-2xl flex flex-col items-center justify-between rounded-xl card-hover p-2 min-h-32 min-w-24 -mr-12 {card.cardSuit.suit}"
	in:fly={{ delay: 300, duration: 800 }}
>
	<div class="flex flex-row items-center self-start">
		<span class="font-semibold">{card.cardRank.value} </span>
	</div>
	<span class="h1 font-semibold">{card.cardRank.value}</span>
	<div class="flex flex-row items-center self-end">
		<span class="font-semibold backward">{card.cardRank.value}</span>
	</div>
</div>
<style>
	.spades,
	.clubs {
		color: black;
	}

	.hearts,
	.diamonds {
		color: red;
	}

	:global(.backward) {
		transform: rotate(180deg);
	}
</style>
