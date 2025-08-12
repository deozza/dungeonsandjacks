export const gameStateMachine: Map<GameStates, Map<StateMachineEvent, GameStates>> = new Map<GameStates, Map<StateMachineEvent, GameStates>>([
  [
    'LOADING',
    new Map([
      ['CONTINUE', 'MAIN_MENU']
    ])
  ],
  [
    'MAIN_MENU',
    new Map([
      ['PLAY', 'PLAYING'],
      ['CONTINUE', 'PLAYING'],
      ['QUIT', 'QUIT']
    ])
  ],
  [
    'PLAYING',
    new Map([
      ['PAUSE', 'PAUSED'],
      ['QUIT', 'MAIN_MENU'],
    ])
  ],
  [
    'PAUSED',
    new Map([
      ['RESUME', 'PLAYING'],
      ['QUIT', 'MAIN_MENU'],
    ])
  ],
  [
    'LOST',
    new Map([
      ['QUIT', 'MAIN_MENU'],
    ])
  ],
  [
    'QUIT',
    new Map()
  ],
]);

export type State = string;
export type StateMachineEvent = string;
export type AbstractStateMachine = Map<State, Map<Event, StateMachineEvent>>;

export type StateMachineLabel = 'game';
export type GameStates = 'LOADING' | 'MAIN_MENU' | 'PLAYING' | 'PAUSED' | 'LOST' | 'QUIT';
