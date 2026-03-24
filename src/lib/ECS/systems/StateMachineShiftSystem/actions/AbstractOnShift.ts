import GameLoop from "$lib/gameLoop/GameLoop";

export default abstract class AbstractOnShift {
  public abstract execute(gameLoop: GameLoop): void;
}
