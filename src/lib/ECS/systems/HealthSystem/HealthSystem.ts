import DamageComponent from "$lib/ECS/components/DamageComponent";
import HealComponent from "$lib/ECS/components/HealComponent";
import HealthComponent from "$lib/ECS/components/HealthComponent";
import type { Entity } from "$lib/ECS/entities";
import AbstractSystem from "../AbstractSystem";

export default class HealthSystem extends AbstractSystem {
    public requiredComponents: Set<Function> = new Set<Function>([HealthComponent]);
    
    public update(entities: Set<Entity>): void {
      for(const entity of entities){
        this.executeHealthVariation(entity);
      }
    }

    private executeHealthVariation(entity: Entity): void {
      const healthComponent: HealthComponent = this.gameLoop?.getComponentFromEntity(HealthComponent, entity) as HealthComponent;
      let healthVariationComponent: DamageComponent | HealComponent | undefined = this.gameLoop?.getComponentFromEntity(DamageComponent, entity) as DamageComponent;

      if(healthVariationComponent === undefined) {
        healthVariationComponent = this.gameLoop?.getComponentFromEntity(HealComponent, entity) as HealComponent;
      }

      if(healthVariationComponent === undefined) {
        return;
      }
    
      if(healthVariationComponent instanceof DamageComponent){
        healthComponent.currentHealth = this.reduceHealth(healthVariationComponent, healthComponent);
        this.gameLoop?.removeComponentFromEntity(DamageComponent, entity);
      }

      if(healthVariationComponent instanceof HealComponent){
        healthComponent.currentHealth = this.addHealth(healthVariationComponent, healthComponent);
        this.gameLoop?.removeComponentFromEntity(HealComponent, entity);
      }
    }

    private reduceHealth(healthVariationComponent: DamageComponent, healthComponent: HealthComponent): number {
      return Math.max(healthComponent.currentHealth - healthVariationComponent.value, 0);
    }

    private addHealth(healthVariationComponent: HealComponent, healthComponent: HealthComponent): number {
      return Math.min(healthComponent.currentHealth + healthVariationComponent.value, healthComponent.maxHealth);
    }
  
}
