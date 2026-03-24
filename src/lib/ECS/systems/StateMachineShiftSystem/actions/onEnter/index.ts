import { roundStateMachine, runStateMachine, type StateMachine } from "$lib/stateMachines/stateMachines";
import type { State } from "$lib/stateMachines/states";
import type AbstractOnShift from "../AbstractOnShift";
import OnEnterFightingState from "./roundStateMachine/OnEnterFightingState";
import OnEnterLoadingState from "./roundStateMachine/OnEnterLoadingState";
import OnEnterPlayingState from "./runStateMachine/OnEnterPlayingState";

export const actionsOnStateEnter = new Map<StateMachine, Map<State, AbstractOnShift>>([
  [runStateMachine, new Map([
    ['Playing', new OnEnterPlayingState()]
  ])],
  [roundStateMachine, new Map([
    ['Loading', new OnEnterLoadingState()],
    ['Fighting', new OnEnterFightingState()]
  ])]
])
