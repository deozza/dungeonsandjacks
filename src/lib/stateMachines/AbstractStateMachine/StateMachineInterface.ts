import type AbstractStateMachine from "./AbstractStateMachine";

export default interface StateMachineInterface {
  listensToEvent(event: Function): AbstractStateMachine;
}
