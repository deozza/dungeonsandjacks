import type ComponentInterface from "$lib/ECS/components/ComponentInterface";
import CurrentStateComponent from "$lib/ECS/components/CurrentStateComponent";
import StateMachineComponent from "$lib/ECS/components/StateMachineComponent";
import type { Entity } from "$lib/ECS/entities";
import StateMachineSystem from "$lib/ECS/systems/StateMachineSystem/StateMachineSystem";
import type { StateMachine } from "$lib/stateMachines/stateMachines";
import type World from "$lib/World";

export function getStateMachineCurrentState(world: World, stateMachine: StateMachine): CurrentStateComponent {
  const stateMachineSystemData: Map<Entity, Map<Function, ComponentInterface>> = world.gameLoop?.getDataFromSystem(StateMachineSystem)!;

  const queriedStateMachine = stateMachineSystemData.entries().find(stateMachineData => {
    return (stateMachineData[1].get(StateMachineComponent) as StateMachineComponent).stateMachine === stateMachine;
  })

  if(queriedStateMachine === undefined) {
    throw new Error("Game bork");
  }

  return queriedStateMachine[1].get(CurrentStateComponent) as CurrentStateComponent;
}
