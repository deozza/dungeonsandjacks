<script lang="ts">
	import { fade } from "svelte/transition";
	import type World from "$lib/World";
	import SplashScreenUI from "./SplashScreenUI.svelte";
	import MainMenuScreenUI from "./MainMenuScreenUI.svelte";
	import PlayScreenUI from "./PlayScreenUI.svelte";
	import PauseScreenUI from "./PauseScreenUI.svelte";
	import CharacterSelectionScreenUi from "./CharacterSelectionScreenUI.svelte";
	import type { Entity } from "$lib/ECS/entities";
	import LoadedScenesComponent from "$lib/ECS/components/LoadedScenesComponent";
	import SceneComponent from "$lib/ECS/components/SceneComponent";

  interface Props {
    world: World
  };

  let { world }: Props = $props();

  const options = [
    {scene: 'Splash', component: SplashScreenUI},
    {scene: 'MainMenu', component: MainMenuScreenUI},
    {scene: 'Play', component: PlayScreenUI},
    {scene: 'Pause', component: PauseScreenUI},
    {scene: 'CharacterSelect', component: CharacterSelectionScreenUi},
  ];

  function getScreenToDisplay() {
    const sceneEntities: Entity[] = world.gameLoop?.getEntitiesByComponents(new Set<Function>([LoadedScenesComponent, SceneComponent])) as Entity[]
   
    const currentSceneComponent: SceneComponent = world.gameLoop?.getComponentFromEntity(SceneComponent, sceneEntities[0]) as SceneComponent;

    return options.find((option) => option.scene === currentSceneComponent?.currentScene);
  }

  let selected = $derived(getScreenToDisplay());

  
</script>

{#if selected !== undefined}
  {#key selected}
    <div class="w-full h-full" in:fade>
      <selected.component {world} />
    </div>
  {/key}
{/if}
