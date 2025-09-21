import type AbstractState from "../states/AbstractState/AbstractState";
import type StateMachineInterface from "./StateMachineInterface";

export default abstract class AbstractStateMachine implements StateMachineInterface{
    protected abstract _currentState: AbstractState;
  
    public get currentState(): AbstractState {
      return this._currentState;
    }

    protected set currentState(state: AbstractState) {
      this._currentState = state;
    }
    
    static #stateMachine: Map<Function, Map<Function, AbstractState>> = new Map<Function, Map<Function, AbstractState>>([])
    
    protected static get stateMachine(): Map<Function, Map<Function, AbstractState>>  {
      return AbstractStateMachine.#stateMachine;
    }

    public listensToEvent(event: Function): AbstractStateMachine {
        throw "Not implemented";
    }
}
