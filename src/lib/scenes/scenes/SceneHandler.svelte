<script lang="ts">
	import type World from "$lib/World";
	import SplashScreen from "../SplashScreen";
	import MainMenuScreen from "../MainMenuScreen";
	import SplashScreenUI from "./SplashScreenUI.svelte";
	import MainMenuScreenUI from "./MainMenuScreenUI.svelte";

  interface Props {
    world: World
  };

  let { world }: Props = $props();

  const options = [
    {scene: SplashScreen, component: SplashScreenUI},
    {scene: MainMenuScreen, component: MainMenuScreenUI},
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
  <selected.component {world} />
{/if}
