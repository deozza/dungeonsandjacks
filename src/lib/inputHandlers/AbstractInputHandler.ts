import type { GameStates } from "$lib/stateMachines";

export default abstract class AbstractInputHandler {
  public abstract execute(keycode: number, state: GameStates): void;
  public abstract expectedInputs: Set<number>;
}
