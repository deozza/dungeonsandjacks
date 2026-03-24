import InputComponent from "$lib/ECS/components/InputComponent";
import StateComponent from "$lib/ECS/components/StateComponent";
import type { Entity } from "$lib/ECS/entities";
import AbstractSystem from "$lib/ECS/systems/AbstractSystem";
import InputHandler from "$lib/inputHandlers/InputHandler";

export default class InputSystem extends AbstractSystem {
  
  public requiredComponents: Set<Function> = new Set<Function>([InputComponent, StateComponent]);
  
  public update(entities: Set<Entity>): void {
    
    for(const entity of entities){
      this.handleInput(entity);
    }
  }

  private handleInput(entity: Entity): void {
    const stateComponent: StateComponent = this.gameLoop?.getComponentFromEntity(StateComponent, entity) as StateComponent;
    const inputComponent: InputComponent = this.gameLoop?.getComponentFromEntity(InputComponent, entity) as InputComponent;

    const inputHandler: InputHandler = InputHandler.getInstance();
    inputHandler.setGameState(stateComponent.currentState);

    inputHandler.handleInput(inputComponent.keycode);
    
		this.gameLoop?.setComponentOfEntityForRemoval(InputComponent, entity);
  }

  private getAvailableInputsByState(state: string): number[] | string {
    if(state === 'LOADING') {
      return [];
    }

    if(state === 'SPLAH_SCREEN') {
      return '*';
    }

    if(state === 'MAIN_MENU') {
      return [
        
      ]
    }

    return [];
  }
}
