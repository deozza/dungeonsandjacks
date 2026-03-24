import StateMachineComponent from "$lib/ECS/components/StateMachineComponent";
import StateMachineShiftComponent from "$lib/ECS/components/StateMachineShiftComponent";
import type { Entity } from "$lib/ECS/entities";
import type { StateMachine } from "$lib/stateMachines/stateMachines";
import AbstractSystem from "../AbstractSystem";
import type AbstractOnShift from "./actions/AbstractOnShift";
import { actionsOnStateEnter } from "./actions/onEnter";

export default class StateMachineShiftSystem extends AbstractSystem {
  public requiredComponents: Set<Function> = new Set<Function>([StateMachineComponent]);
  public listensOnEvents: Set<Function> = new Set<Function>([StateMachineShiftComponent]);
  public excludedComponents: Set<Function> = new Set<Function>([]);

  public update(entities: Set<Entity>): void {
    for(const entity of entities){

      if(this.hasEvents(entity) === false) {
        continue;
      }

      const stateMachineShiftComponent: StateMachineShiftComponent = this.getStateMachineShiftComponent(entity);
      const stateMachineComponent: StateMachineComponent = this.getStateMachineComponent(entity);

      this.onStateLeave(entity, stateMachineComponent.stateMachine, stateMachineShiftComponent);
      this.onStateEnter(entity, stateMachineComponent.stateMachine, stateMachineShiftComponent);
      
      this.gameLoop?.setComponentOfEntityForRemoval(StateMachineShiftComponent, entity);
    }
  }

  private onStateLeave(entity: Entity, stateMachine: StateMachine, stateMachineShiftComponent: StateMachineShiftComponent): void {
    
  }

  private onStateEnter(entity: Entity, stateMachine: StateMachine, stateMachineShiftComponent: StateMachineShiftComponent): void {
    if(actionsOnStateEnter.get(stateMachine) === undefined) {
      return;
    }

    const action: AbstractOnShift | undefined = actionsOnStateEnter.get(stateMachine)?.get(stateMachineShiftComponent.newState);

    if(action === undefined) {
      return;
    }

    action.execute(this.gameLoop!);
  }

  private getStateMachineShiftComponent(entity: Entity): StateMachineShiftComponent {
    return this.gameLoop?.getComponentFromEntity(StateMachineShiftComponent, entity) as StateMachineShiftComponent;
  }
  
  private getStateMachineComponent(entity: Entity): StateMachineComponent {
    return this.gameLoop?.getComponentFromEntity(StateMachineComponent, entity) as StateMachineComponent;
  }
}
