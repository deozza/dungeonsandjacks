import DamageComponent from "$lib/ECS/components/DamageComponent";
import HealComponent from "$lib/ECS/components/HealComponent";
import HealthComponent from "$lib/ECS/components/HealthComponent";
import type { Entity } from "$lib/ECS/entities";
import AbstractSystem from "../AbstractSystem";

export default class HealthSystem extends AbstractSystem {
    public requiredComponents: Set<Function> = new Set<Function>([HealthComponent]);
    public listensOnEvents: Set<Function> = new Set<Function>([DamageComponent, HealComponent]);
    public excludedComponents: Set<Function> = new Set<Function>([]);
    
    public update(entities: Set<Entity>): void {
      for(const entity of entities){

        if(this.hasEvents(entity) === false) {
          continue;
        }
        
        this.executeHealthVariation(entity);
      }
    }

    private executeHealthVariation(entity: Entity): void {
      const healthComponent: HealthComponent = this.gameLoop?.getComponentFromEntity(HealthComponent, entity) as HealthComponent;
      let healthVariationComponent: DamageComponent | HealComponent | undefined = this.gameLoop?.getComponentFromEntity(DamageComponent, entity) as DamageComponent;

      if(healthVariationComponent === undefined) {
        healthVariationComponent = this.gameLoop?.getComponentFromEntity(HealComponent, entity) as HealComponent;
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
