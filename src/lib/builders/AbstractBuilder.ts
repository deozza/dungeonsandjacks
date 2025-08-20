import type { Entity } from "$lib/ECS/entities";
import type GameLoop from "$lib/gameLoop/GameLoop";

export default abstract class AbstractBuilder {
  public gameLoop: GameLoop | undefined = undefined;
  public abstract build(values: any): Entity;
  public static instance: AbstractBuilder | undefined = undefined;

  public abstract getInstance(): AbstractBuilder;
}
