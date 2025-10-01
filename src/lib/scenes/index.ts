import { gameStateMachine, runStateMachine, type StateMachine } from "$lib/stateMachines/stateMachines";
import type { State } from "$lib/stateMachines/states";

export type SceneConstraints = Map<StateMachine, State>;

export type Scene =
'MainMenu' |
'Pause' |
'Play' |
'Splash' |
'CharacterSelect'
;

export const splashSceneConstraints: SceneConstraints = new Map<StateMachine, State>([
  [gameStateMachine, 'Idle']
]);

export const pauseSceneConstraints: SceneConstraints = new Map<StateMachine, State>([
  [gameStateMachine, 'Paused']
]);

export const playSceneConstraints: SceneConstraints = new Map<StateMachine, State>([
  [gameStateMachine, 'Playing'],
  [runStateMachine, 'Playing']
]);

export const mainMenuSceneConstraints: SceneConstraints = new Map<StateMachine, State>([
  [gameStateMachine, 'MainMenu']
]);

export const characterSelectSceneConstraints: SceneConstraints = new Map<StateMachine, State>([
    [gameStateMachine, 'Playing'],
    [runStateMachine, 'CharacterSelection']
]);
