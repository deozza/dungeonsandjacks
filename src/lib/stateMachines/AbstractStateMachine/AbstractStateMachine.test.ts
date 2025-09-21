import { describe, expect, it, vi, afterEach } from "vitest";
import AbstractStateMachine from "./AbstractStateMachine";
import AbstractState from "../states/AbstractState/AbstractState";
import type EventInterface from "../events/EventInterface";

class DummyState1 extends AbstractState {
    public onStateEnter(): void {
    }
    public onStateExecute(): void {
    }
    public onStateExit(): void {
    }
}

class DummyState2 extends AbstractState {
    public onStateEnter(): void {
    }
    public onStateExecute(): void {
    }
    public onStateExit(): void {
    }
}

class DummyState3 extends AbstractState {
    public onStateEnter(): void {
    }
    public onStateExecute(): void {
    }
    public onStateExit(): void {
    }
}

class DummyEvent1 implements EventInterface{
  
}

class DummyEvent2 implements EventInterface{
  
}

class DummyEvent3 implements EventInterface{
  
}

class DummyStateMachine extends AbstractStateMachine {
    protected _currentState: AbstractState = new DummyState1();
    
    static #stateMachine: Map<Function, Map<Function, AbstractState>> = new Map<Function, Map<Function, AbstractState>>([
      [DummyState1, new Map<Function, AbstractState>([
        [DummyEvent1, new DummyState2()]
      ])],
      [DummyState2, new Map<Function, AbstractState>([
        [DummyEvent2, new DummyState3()]
      ])],
      [DummyState3, new Map<Function, AbstractState>([
        [DummyEvent3, new DummyState1()]
      ])],
    ])

    protected static get stateMachine(): Map<Function, Map<Function, AbstractState>>  {
      return DummyStateMachine.#stateMachine;
    }
    
    static #instance: DummyStateMachine | undefined = undefined;

    public static get instance(): DummyStateMachine {
      if(DummyStateMachine.#instance === undefined) {
        DummyStateMachine.#instance = new DummyStateMachine();
      }

      return DummyStateMachine.#instance;
    }

    public static resetInstance(): void {
      DummyStateMachine.#instance = undefined;
    }
    
    public listensToEvent(event: Function): DummyStateMachine {
      const nextState = DummyStateMachine.stateMachine.get(DummyStateMachine.instance.currentState.constructor)?.get(event);

      if(nextState === undefined) {
        return DummyStateMachine.instance;
      }

      DummyStateMachine.instance.currentState.onStateExit();
      DummyStateMachine.instance.currentState = nextState;
      DummyStateMachine.instance.currentState.onStateEnter();

      return DummyStateMachine.instance;
    }
}


afterEach(() => {
  DummyStateMachine.resetInstance();
})

describe('get instance', () => {
  it('returns a singleton', () => {

    expect(DummyStateMachine['#instance']).toBeUndefined();
    
    const dummyStateMachine: DummyStateMachine = DummyStateMachine.instance as DummyStateMachine;

    expect(dummyStateMachine).toStrictEqual(DummyStateMachine['instance']);
  });
});

describe('listensToEvent', () => {
  it('unexpected event stops process', () => {
    const dummyStateMachine: DummyStateMachine = DummyStateMachine.instance as DummyStateMachine;

    expect(dummyStateMachine.currentState).toStrictEqual(new DummyState1());

    const onStateExitSpy = vi.spyOn(dummyStateMachine.currentState, 'onStateExit');
    
    dummyStateMachine.listensToEvent(DummyEvent3);

    expect(onStateExitSpy).toHaveBeenCalledTimes(0);
    expect(dummyStateMachine.currentState).toStrictEqual(new DummyState1());
  });
  
  it('updates currentState on expected event', () => {
    const dummyStateMachine: DummyStateMachine = DummyStateMachine.instance as DummyStateMachine;

    expect(dummyStateMachine.currentState).toStrictEqual(new DummyState1());

    dummyStateMachine.listensToEvent(DummyEvent1);

    expect(dummyStateMachine.currentState).toStrictEqual(new DummyState2());
    
  });
  
  it('calls stateExit and stateEnter', () => {
    const dummyStateMachine: DummyStateMachine = DummyStateMachine.instance as DummyStateMachine;

    expect(dummyStateMachine.currentState).toStrictEqual(new DummyState1());

    const currentState = dummyStateMachine.currentState;

    const onStateExitSpy = vi.spyOn(currentState, 'onStateExit');
    
    dummyStateMachine.listensToEvent(DummyEvent1);

    expect(onStateExitSpy).toHaveBeenCalledTimes(1);
    
  });
});
