import type { Entity } from "../entities";
import type ComponentInterface from "./ComponentInterface";

export default class CardPileComponent implements ComponentInterface {
  public cards: Set<Entity> = new Set<Entity>([]);
}
