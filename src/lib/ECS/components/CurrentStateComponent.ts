import type ComponentInterface from "$lib/ECS/components/ComponentInterface";
import type { State } from "$lib/stateMachines/states";

export default class CurrentStateComponent implements ComponentInterface {
  public currentState: State;

  constructor(currentState: State) {
    this.currentState = currentState;
  }
}
