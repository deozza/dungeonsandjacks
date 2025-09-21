<script lang="ts">
	import type World from "$lib/World";
	import SplashScreen from "../SplashScreen";
	import MainMenuScreen from "../MainMenuScreen";
	import SplashScreenUI from "./SplashScreenUI.svelte";
	import MainMenuScreenUI from "./MainMenuScreenUI.svelte";
	import PauseScreen from "../PauseScreen";
	import PlayScreen from "../PlayScreen";
	import PlayScreenUI from "./PlayScreenUI.svelte";
	import PauseScreenUI from "./PauseScreenUI.svelte";
	import { fade } from "svelte/transition";

  interface Props {
    world: World
  };

  let { world }: Props = $props();

  const options = [
    {scene: SplashScreen, component: SplashScreenUI},
    {scene: MainMenuScreen, component: MainMenuScreenUI},
    {scene: PlayScreen, component: PlayScreenUI},
    {scene: PauseScreen, component: PauseScreenUI},
  ]


  function getScreenToDisplay() {
    if(world.currentScreen === undefined){
      return options[0]
    }

    return options.find(option => option.scene === world.currentScreen.constructor);
  }

  let selected = $derived(getScreenToDisplay());

  
</script>

{#if world.currentScreen !== undefined}
  {#key selected}
    <div in:fade>
      <selected.component {world} />
    </div>
  {/key}
{/if}
