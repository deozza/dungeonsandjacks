import type { StateMachine } from "$lib/stateMachines/stateMachines";
import type ComponentInterface from "./ComponentInterface";

export default class StateMachineComponent implements ComponentInterface {
    public readonly stateMachine: StateMachine;

    constructor(stateMachine: StateMachine) {
      this.stateMachine = stateMachine;
    }
  
}
