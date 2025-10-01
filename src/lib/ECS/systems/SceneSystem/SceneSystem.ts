import CurrentStateComponent from "$lib/ECS/components/CurrentStateComponent";
import LoadedScenesComponent from "$lib/ECS/components/LoadedScenesComponent";
import SceneComponent from "$lib/ECS/components/SceneComponent";
import StateMachineComponent from "$lib/ECS/components/StateMachineComponent";
import type { Entity } from "$lib/ECS/entities";
import type { Scene, SceneConstraints } from "$lib/scenes";
import type { StateMachine } from "$lib/stateMachines/stateMachines";
import type { State } from "$lib/stateMachines/states";
import AbstractSystem from "../AbstractSystem";

export default class SceneSystem extends AbstractSystem {
  public listensOnEvents: Set<Function> = new Set<Function>([]);
  public excludedComponents: Set<Function> = new Set<Function>([]);
  public requiredComponents: Set<Function> = new Set<Function>([CurrentStateComponent, StateMachineComponent]);
  
  public update(entities: Set<Entity>): void {
    const sceneEntity: Entity = this.getSceneEntity();
    const loadedScenes: LoadedScenesComponent = this.getLoadedScenes(sceneEntity);

    const currentScene: SceneComponent = this.getCurrentScene(sceneEntity);
    const stateMachines: Map<StateMachine, State> = this.getStateMachines(entities);
    
    loadedScenes.scenes.forEach((scene: Scene, sceneConstraints: SceneConstraints) => {
      if(this.checkConstraintsOfSceneAreRespected(sceneConstraints, stateMachines) === true && currentScene.currentScene !== scene) {
        currentScene.currentScene = scene;
      }
    });
  }

  private getStateMachines(entities: Set<Entity>): Map<StateMachine, State> {
    const stateMachines: Map<StateMachine, State> = new Map<StateMachine, State>([]);
    entities.forEach((entity: Entity) => {
      stateMachines.set(this.getStateMachinesComponent(entity).stateMachine, this.getCurrentStateComponent(entity).currentState);
    })

    return stateMachines;
  }

  private getStateMachinesComponent(entity: Entity): StateMachineComponent {
    return this.gameLoop?.getComponentFromEntity(StateMachineComponent, entity) as StateMachineComponent;
  }

  private getCurrentStateComponent(entity: Entity): CurrentStateComponent {
    return this.gameLoop?.getComponentFromEntity(CurrentStateComponent, entity) as CurrentStateComponent;
  }

  private checkConstraintsOfSceneAreRespected(sceneConstraints: SceneConstraints, stateMachines: Map<StateMachine, State>): boolean {
    for(let [stateMachine, state] of sceneConstraints) {
      if(stateMachines.has(stateMachine) === false) {
        return false;
      }

      if(stateMachines.get(stateMachine) !== state) {
        return false;
      }
    }

    return true;
  }

  private getSceneEntity(): Entity {
    const entities: Entity[] = this.gameLoop?.getEntitiesByComponents(new Set([SceneComponent, LoadedScenesComponent])) as Entity[];

    if(entities.length !== 1) {
      throw 'No entities found';
    }

    return entities[0];
  }

  private getCurrentScene(entity: Entity): SceneComponent {
    return this.gameLoop?.getComponentFromEntity(SceneComponent, entity) as SceneComponent;
  }

  private getLoadedScenes(entity: Entity): LoadedScenesComponent {
    return this.gameLoop?.getComponentFromEntity(LoadedScenesComponent , entity) as LoadedScenesComponent ;
    
  }

}
