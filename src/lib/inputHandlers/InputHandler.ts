import type { GameStates } from "$lib/stateMachines";
import type AbstractInputHandler from "./AbstractInputHandler";

export default class InputHandler {
  private context: AbstractInputHandler | undefined;
  private gameState: GameStates | undefined;
  static instance: InputHandler | null;

  public static getInstance(): InputHandler {
    if(this.instance === null) {
      this.instance = new InputHandler();
    }

    return this.instance;
  } 

  public setContext(context: AbstractInputHandler): InputHandler {
    InputHandler.instance.context = context;
    return this;
  }

  public setGameState(gameState: GameStates): InputHandler {
    InputHandler.instance.gameState = gameState;
    return this;
  }

  public handleInput(keycode: number): void {
    if(InputHandler.instance.context.expectedInputs.has(keycode) === false) {
      return;
    }

    InputHandler.instance.context.execute(keycode, InputHandler.instance.gameState);
  }
}
