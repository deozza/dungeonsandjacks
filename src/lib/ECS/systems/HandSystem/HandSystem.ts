import CardMovementComponent from "$lib/ECS/components/CardMovementComponent";
import CardRankComponent from "$lib/ECS/components/CardRankComponent";
import HandBustedFlagComponent from "$lib/ECS/components/HandBustedFlagComponent";
import HandComponent from "$lib/ECS/components/HandComponent";
import type { Entity } from "$lib/ECS/entities";
import AbstractSystem from "../AbstractSystem";

export default class HandSystem extends AbstractSystem {
    public requiredComponents: Set<Function> = new Set<Function>([HandComponent]);
    public listensOnEvents: Set<Function> = new Set<Function>([CardMovementComponent]);
    public excludedComponents: Set<Function> = new Set<Function>([]);
    
    public update(entities: Set<Entity>): void {
      for(const entity of entities) {
        if(this.hasEvents(entity) === false) {
          continue;
        }

        this.updateHandValue(entity);

        if(this.checkHandIsBusted(entity)) {
          this.gameLoop?.addComponentToEntity(new HandBustedFlagComponent(), entity);
        }
      }
    }

    private updateHandValue(entity: Entity): void {
      const cardMovementComponent: CardMovementComponent = this.gameLoop?.getComponentFromEntity(CardMovementComponent, entity) as CardMovementComponent;
      if(cardMovementComponent.moveTo !== HandComponent) {
        return;
      }

      const cardRank: CardRankComponent = this.gameLoop?.getComponentFromEntity(CardRankComponent, cardMovementComponent.card) as CardRankComponent;
      const handComponent: HandComponent = this.gameLoop?.getComponentFromEntity(HandComponent, entity) as HandComponent;

      handComponent.value += cardRank.value;
    }

    private checkHandIsBusted(entity: Entity): boolean {
      const handComponent: HandComponent = this.gameLoop?.getComponentFromEntity(HandComponent, entity) as HandComponent;
      return handComponent.value > 21;
      
    }
  
}
