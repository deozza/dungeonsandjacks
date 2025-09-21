import type World from "$lib/World";
import type SceneInterface from "./SceneInterface";

export default abstract class AbstractScene implements SceneInterface {
  constraintsAreRespected(): boolean {
      throw new Error("Method not implemented.");
  }
  
  public displayed: boolean = false;

  protected abstract constraints: Map<Function, Function>;
  protected world: World | undefined = undefined;

  public setWorld(world: World): void {
    this.world = world;
  }
}
