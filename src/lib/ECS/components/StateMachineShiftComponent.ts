import type { State } from "$lib/stateMachines/states";
import type ComponentInterface from "./ComponentInterface";

export default class StateMachineShiftComponent implements ComponentInterface {
  public readonly oldState: State;
  public readonly newState: State;
  
  constructor(oldState: State, newState: State) {
    this.oldState = oldState;
    this.newState = newState;
  }
  
}
