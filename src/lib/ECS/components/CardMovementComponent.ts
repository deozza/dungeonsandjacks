import type { Entity } from "../entities";
import type ComponentInterface from "./ComponentInterface";

export default class CardMovementComponent implements ComponentInterface {
  public card: Entity;
  public moveTo: Function | undefined;
  public moveFrom: Function | undefined;
}
