import type { Scene } from "$lib/scenes";
import type ComponentInterface from "./ComponentInterface";

export default class SceneComponent implements ComponentInterface {
  public currentScene: Scene | undefined;
}
