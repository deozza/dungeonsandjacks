export const gameStateMachine: StateMachine = new Map([
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
export type StateMachine = Map<State, Map<Event, StateMachineEvent>>;

export type StateMachineLabel = 'game';
