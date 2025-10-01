import CurrentStateComponent from "$lib/ECS/components/CurrentStateComponent";
import StateMachineComponent from "$lib/ECS/components/StateMachineComponent";
import StateMachineEventComponent from "$lib/ECS/components/StateMachineEventComponent";
import type { Entity } from "$lib/ECS/entities";
import type { State } from "$lib/stateMachines/states";
import AbstractSystem from "../AbstractSystem";

export default class StateMachineSystem extends AbstractSystem {
  public requiredComponents: Set<Function> = new Set<Function>([CurrentStateComponent, StateMachineComponent]);
  public listensOnEvents: Set<Function> = new Set<Function>([StateMachineEventComponent]);
  public excludedComponents: Set<Function> = new Set<Function>([]);

  public update(entities: Set<Entity>): void {
    for(const entity of entities){

      if(this.hasEvents(entity) === false) {
        continue;
      }

      this.updateStateMachine(entity);
      this.gameLoop?.removeComponentFromEntity(StateMachineEventComponent, entity);
    }
  }

  private updateStateMachine(entity: Entity): void {
      const nextState: State | undefined = this.getNextState(entity);

      if(nextState === undefined) {
        return;
      }

      this.applyNextState(entity, nextState);
  }

  private applyNextState(entity: Entity, nextState: State): void {
    this.getCurrentStateComponent(entity).currentState = nextState;
  }


  private getNextState(entity: Entity): State | undefined {
    return this.getStateMachineComponent(entity)
      .stateMachine
      .get(this.getCurrentStateComponent(entity).currentState)
      ?.get(this.getStateMachineEventComponent(entity).event);
  }

  private getStateMachineComponent(entity: Entity): StateMachineComponent {
    return this.gameLoop?.getComponentFromEntity(StateMachineComponent, entity) as StateMachineComponent;
  }
  
  private getCurrentStateComponent(entity: Entity): CurrentStateComponent {
    return this.gameLoop?.getComponentFromEntity(CurrentStateComponent, entity) as CurrentStateComponent;
  }

  private getStateMachineEventComponent(entity: Entity): StateMachineEventComponent {
    return this.gameLoop?.getComponentFromEntity(StateMachineEventComponent, entity) as StateMachineEventComponent;
  }
}
