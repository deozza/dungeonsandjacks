import AbstractStateMachine from "../AbstractStateMachine/AbstractStateMachine";
import ContinueEvent from "../events/ContinueEvent";
import PauseEvent from "../events/PauseEvent";
import PlayEvent from "../events/PlayEvent";
import QuitEvent from "../events/QuitEvent";
import type AbstractState from "../states/AbstractState/AbstractState";
import IdleState from "../states/GameStateMachine/Idle/IdleState";
import LostState from "../states/GameStateMachine/Lost/LostState";
import MainMenuState from "../states/GameStateMachine/MainMenu/MainMenuState";
import PausedState from "../states/GameStateMachine/Paused/PausedState";
import PlayingState from "../states/GameStateMachine/Playing/PlayingState";
import QuitState from "../states/GameStateMachine/Quit/QuitState";

export default class GameStateMachine extends AbstractStateMachine {
    protected _currentState: AbstractState = new IdleState();
    
    protected instance: GameStateMachine | undefined;
    
    static #stateMachine: Map<Function, Map<Function, AbstractState>> = new Map<Function, Map<Function, AbstractState>>([
      [IdleState, new Map<Function, AbstractState>([
        [ContinueEvent, new MainMenuState()],
      ])],
      [MainMenuState, new Map<Function, AbstractState>([
        [PlayEvent, new PlayingState()],
        [QuitEvent, new QuitState()]
      ])],
      [PlayingState, new Map<Function, AbstractState>([
        [PauseEvent, new PausedState()],
      ])],
      [PausedState, new Map<Function, AbstractState>([
        [ContinueEvent, new PlayingState()],
        [QuitEvent, new QuitState],
      ])],
      [LostState, new Map<Function, AbstractState>([
        [ContinueEvent, new MainMenuState],
      ])],
      [QuitState, new Map<Function, AbstractState>()],
    ]);
    
    protected static get stateMachine(): Map<Function, Map<Function, AbstractState>>  {
      return GameStateMachine.#stateMachine;
    }
    
    static #instance: GameStateMachine | undefined = undefined;

    public static get instance(): GameStateMachine {
      if(GameStateMachine.#instance === undefined) {
        GameStateMachine.#instance = new GameStateMachine();
      }

      return GameStateMachine.#instance;
    }

    public static resetInstance(): void {
      GameStateMachine.#instance = undefined;
    }
    
    public listensToEvent(event: Function): GameStateMachine {
      const nextState = GameStateMachine.stateMachine.get(GameStateMachine.instance.currentState.constructor)?.get(event);

      if(nextState === undefined) {
        return GameStateMachine.instance;
      }

      GameStateMachine.instance.currentState.onStateExit();
      GameStateMachine.instance.currentState = nextState;
      GameStateMachine.instance.currentState.onStateEnter();

      return GameStateMachine.instance;
    }
}
