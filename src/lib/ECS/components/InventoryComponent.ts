import type { Entity } from "../entities";
import type ComponentInterface from "./ComponentInterface";

export default class InventoryComponent implements ComponentInterface {
  public objects: Set<Entity> = new Set<Entity>([]);
}
