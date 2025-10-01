import type ComponentInterface from "$lib/ECS/components/ComponentInterface";
import type { StateMachineEvent } from "$lib/stateMachines/events";

export default class StateMachineEventComponent implements ComponentInterface {
  public event: StateMachineEvent;

  constructor(event: StateMachineEvent) {
    this.event = event;
  }
}
