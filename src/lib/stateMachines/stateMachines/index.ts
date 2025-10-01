import type { StateMachineEvent } from "../events";
import type { State } from "../states";

export type StateMachine = Map<State, Map<StateMachineEvent, State>>

export const gameStateMachine: StateMachine = new Map<State, Map<StateMachineEvent, State>>([
  ['Idle', new Map<StateMachineEvent, State>([
    ['ContinueEvent', 'MainMenu'],
  ])],
  ['MainMenu', new Map<StateMachineEvent, State>([
    ['PlayEvent', 'Playing'],
    ['QuitEvent', 'Quit']
  ])],
  ['Playing', new Map<StateMachineEvent, State>([
    ['PauseEvent', 'Paused'],
  ])],
  ['Paused', new Map<StateMachineEvent, State>([
    ["ContinueEvent", 'Playing'],
    ['QuitEvent', 'MainMenu'],
  ])],
  ['Lost', new Map<StateMachineEvent, State>([
    ['ContinueEvent', 'MainMenu'],
  ])],
  ['Quit', new Map<StateMachineEvent, State>()],
]);

export const runStateMachine: StateMachine = new Map<State, Map<StateMachineEvent, State>>([
  ['Idle', new Map<StateMachineEvent, State>([
    ['PlayEvent', 'CharacterSelection'],
  ])],
  ['CharacterSelection', new Map<StateMachineEvent, State>([
    ['QuitEvent', 'Idle'],
    ['SelectCharacterEvent', 'Playing'],
  ])],
  ['Playing', new Map<StateMachineEvent, State>([
    ['LootEvent', 'Loot'],
    ['ShopEvent', 'Shop'],
    ['LostEvent', 'Lost'],
    ['QuitEvent', 'Idle'],
  ])],
  ['Lost', new Map<StateMachineEvent, State>([
    ['QuitEvent', 'Idle'],
  ])],
  ['Loot', new Map<StateMachineEvent, State>([
    ['ShopEvent', 'Shop'],
    ['ContinueEvent', 'Playing'],
  ])],
  ['Shop', new Map<StateMachineEvent, State>([
    ['ContinueEvent', 'Playing'],
  ])],
  
]);
