import InputComponent from "$lib/ECS/components/InputComponent";
import type { Entity } from "$lib/ECS/entities";
import AbstractSystem from "$lib/ECS/systems/AbstractSystem";

export default class InputSystem extends AbstractSystem {
  
  public requiredComponents: Set<Function> = new Set<Function>([InputComponent]);
  
  public update(entities: Set<Entity>): void {
    
    for(const entity of entities){
      this.handleInput(entity);
    }
  }

  private handleInput(entity: Entity): void {

		this.gameLoop?.removeEntity(entity);
		 
  }
}
