import GameStateMachine from "$lib/stateMachines/GameStateMachine/GameStateMachine";
import PlayingState from "$lib/stateMachines/states/GameStateMachine/Playing/PlayingState";
import AbstractScene from "./AbstractScene";
import type SceneInterface from "./SceneInterface";

export default class PlayScreen extends AbstractScene implements SceneInterface {
    protected constraints: Map<Function, Function> = new Map<Function, Function>([
      [GameStateMachine, PlayingState]
    ]);
    
    public constraintsAreRespected(): boolean {

      for(const constraint of this.constraints.entries()) {
        if(this.world?.stateMachines.has(constraint[0]) === false) {
          return false;
        }
        
        if(this.world?.stateMachines.get(constraint[0])?.currentState.constructor !== constraint[1]) {
          return false;
        }
        
      }
      
      return true;
    }
  
}
