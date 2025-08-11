<script lang="ts">
  import GameLoop from '$lib/gameLoop/GameLoop';
  import SceneSystem from '$lib/ECS/systems/SceneSystem/SceneSystem';
  import InputSystem from '$lib/ECS/systems/InputSystem/InputSystem';
  import SceneComponent from '$lib/ECS/components/SceneComponent';
  import StateComponent from '$lib/ECS/components/StateComponent';
  import type Entity from '$lib/ECS/entities/index';
	import { onMount } from 'svelte';
  
  const gameLoop: GameLoop = new GameLoop()
  gameLoop.addSystem(new InputSystem());
  gameLoop.addSystem(new SceneSystem());

  const sceneEntity: Entity = gameLoop.addEntity();
  gameLoop.addComponentToEntity(new SceneComponent(), sceneEntity);
  
  const stateEntity: Entity = gameLoop.addEntity();
  gameLoop.addComponentToEntity(new StateComponent(), stateEntity);

  onMount(() =>  {
    requestAnimationFrame(update);
  })
  
  function update() {
    gameLoop.update()
		requestAnimationFrame(update);
  }
  
  function onKeyUp(e) {
	}

</script>

<div class="flex flex-row justify-center align-center items-center w-full h-screen">
  <div class="flex flex-row justify-center align-center items-center h-[80vh] w-10/12 bg-white">
  </div>
</div>

<style>
</style>
<svelte:window on:keyup|preventDefault={onKeyUp} />
