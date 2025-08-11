import SceneComponent from "$lib/ECS/components/SceneComponent";
import StateComponent from "$lib/ECS/components/StateComponent";
import type { Entity } from "$lib/ECS/entities";
import AbstractSystem from "../AbstractSystem";

export default class SceneSystem extends AbstractSystem {
    public requiredComponents: Set<Function> = new Set<Function>([SceneComponent]);
    
    public update(entities: Set<Entity>): void {
        const stateEntity: Entity[] | undefined = this.gameLoop?.getEntitiesByComponents(new Set<Function>([StateComponent]));
        if(stateEntity === undefined || stateEntity.length <= 0) {
          return;
        }

        const stateComponent: StateComponent = this.gameLoop?.getComponentFromEntity(StateComponent, stateEntity[0]) as StateComponent;

        let sceneComponent: undefined | SceneComponent;

        for(const entity of entities) {
          sceneComponent = this.updateScene(entity, stateComponent)
        }

        if(sceneComponent === undefined){
          return;
        }

        this.renderScene(sceneComponent);
    }

    private updateScene(entity: Entity, stateComponent: StateComponent): SceneComponent | undefined {
      if(stateComponent.newState === undefined || stateComponent.newState === stateComponent.currentState) {
        return undefined;
      }

      const sceneComponent: SceneComponent = this.gameLoop?.getComponentFromEntity(SceneComponent, entity) as SceneComponent;

      switch(stateComponent.newState) {
        case 'SPLASH_SCREEN':
          sceneComponent.currentScene = 'SPLASH';
          break;
        case 'MAIN_MENU':
          sceneComponent.currentScene = 'MAIN_MENU';
          break;
        default: break;          
      }

      stateComponent.currentState = stateComponent.newState;
      stateComponent.newState = undefined;

      return sceneComponent;
    }

    private renderScene(sceneComponent: SceneComponent): void {
    }
}
