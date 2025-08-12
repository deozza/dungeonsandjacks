import type ComponentInterface from "./ComponentInterface";

export default class HealthComponent implements ComponentInterface {
  public currentHealth: number = 0;
  public maxHealth: number = 0;
}
