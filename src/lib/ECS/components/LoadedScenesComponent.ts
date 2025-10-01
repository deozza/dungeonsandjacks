import type ComponentInterface from "./ComponentInterface";
import { splashSceneConstraints, type Scene, type SceneConstraints } from "$lib/scenes";

export default class LoadedScenesComponent implements ComponentInterface {
  public scenes: Map<SceneConstraints, Scene> = new Map([
    [splashSceneConstraints, 'Splash']
  ]);
}
