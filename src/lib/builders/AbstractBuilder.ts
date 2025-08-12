import type { Entity } from "$lib/ECS/entities";
import type GameLoop from "$lib/gameLoop/GameLoop";

export default abstract class AbstractBuilder {
  public gameLoop: GameLoop | undefined = undefined;
  public abstract build(values: any): Entity;
}
