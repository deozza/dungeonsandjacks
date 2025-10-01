import CurrentStateComponent from "./ECS/components/CurrentStateComponent";
import LoadedScenesComponent from "./ECS/components/LoadedScenesComponent";
import SceneComponent from "./ECS/components/SceneComponent";
import StateMachineComponent from "./ECS/components/StateMachineComponent";
import type { Entity } from "./ECS/entities";
import SceneSystem from "./ECS/systems/SceneSystem/SceneSystem";
import StateMachineSystem from "./ECS/systems/StateMachineSystem/StateMachineSystem";
import GameLoop from "./gameLoop/GameLoop";
import { characterSelectSceneConstraints, mainMenuSceneConstraints, pauseSceneConstraints, playSceneConstraints, splashSceneConstraints } from "./scenes";
import { gameStateMachine, runStateMachine } from "./stateMachines/stateMachines";

export default class World {
  #gameLoop: GameLoop | undefined = undefined;

  public get gameLoop(): GameLoop | undefined {
    return this.#gameLoop;
  }
  
  public update(): void {
    if(this.#gameLoop === undefined) {
      throw "Game not loaded";
    }

    this.#gameLoop.update();
  }

  private loadStateMachines(): void {
    this.gameLoop?.addSystem(new StateMachineSystem());

    const gameStateMachineEntity: Entity = this.gameLoop!.addEntity();

    this.gameLoop?.addComponentToEntity(new StateMachineComponent(gameStateMachine), gameStateMachineEntity);
    this.gameLoop?.addComponentToEntity(new CurrentStateComponent('Idle'), gameStateMachineEntity);
    
    const runStateMachineEntity: Entity = this.gameLoop!.addEntity();

    this.gameLoop?.addComponentToEntity(new StateMachineComponent(runStateMachine), runStateMachineEntity);
    this.gameLoop?.addComponentToEntity(new CurrentStateComponent('Idle'), runStateMachineEntity);
  }

  private loadScenes(): void {
    this.gameLoop?.addSystem(new SceneSystem());

    const sceneEntity: Entity = this.gameLoop!.addEntity();

    this.gameLoop?.addComponentToEntity(new SceneComponent(), sceneEntity);

    const loadedScenesComponent: LoadedScenesComponent = new LoadedScenesComponent();
    loadedScenesComponent.scenes = new Map([
      [splashSceneConstraints, 'Splash'],
      [mainMenuSceneConstraints, 'MainMenu'],
      [characterSelectSceneConstraints, 'CharacterSelect'],
      [playSceneConstraints, 'Play'],
      [pauseSceneConstraints, 'Pause']
    ]);

    this.gameLoop?.addComponentToEntity(loadedScenesComponent, sceneEntity);
  }

  public load(): void {
    this.#gameLoop = new GameLoop();
    this.loadStateMachines();
    this.loadScenes();
  }
}
