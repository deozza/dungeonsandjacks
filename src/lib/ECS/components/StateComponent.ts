import type { State, StateMachineLabel } from "$lib/stateMachines";
import type ComponentInterface from "$lib/ECS/components/ComponentInterface";

export default class StateComponent implements ComponentInterface {
  public currentState: State;
  public label: StateMachineLabel;

  constructor(currentState: State, label: StateMachineLabel) {
    this.currentState = currentState;
    this.label = label;
  }
}
