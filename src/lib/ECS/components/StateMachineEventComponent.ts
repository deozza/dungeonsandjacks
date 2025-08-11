import type { StateMachineEvent } from "$lib/stateMachines";
import type ComponentInterface from "$lib/ECS/components/ComponentInterface";

export default class StateMachineEventComponent implements ComponentInterface {
  public event: StateMachineEvent;

  constructor(event: StateMachineEvent) {
    this.event = event;
  }
}
