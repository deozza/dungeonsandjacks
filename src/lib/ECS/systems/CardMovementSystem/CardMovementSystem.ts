import CardMovementComponent from "$lib/ECS/components/CardMovementComponent";
import type CardPileComponent from "$lib/ECS/components/CardPileComponent";
import DeckComponent from "$lib/ECS/components/DeckComponent";
import DiscardComponent from "$lib/ECS/components/DiscardComponent";
import HandComponent from "$lib/ECS/components/HandComponent";
import type { Entity } from "$lib/ECS/entities";
import AbstractSystem from "../AbstractSystem";

export default class CardMovementSystem extends AbstractSystem {
    public requiredComponents: Set<Function> = new Set<Function>([HandComponent, DeckComponent, DiscardComponent]);
    public listensOnEvents: Set<Function> = new Set<Function>([CardMovementComponent]);
    public excludedComponents: Set<Function> = new Set<Function>([]);
    
    public update(entities: Set<Entity>): void {
      for(const entity of entities) {
        if(this.hasEvents(entity) === false) {
          continue;
        }
        
        this.moveCard(entity);
      }
    }

    private moveCard(entity: Entity): void {
      const cardMovementComponent: CardMovementComponent = this.gameLoop?.getComponentFromEntity(CardMovementComponent, entity) as CardMovementComponent;

      if(cardMovementComponent.moveFrom !== undefined){
        this.removeCard(cardMovementComponent, entity);
      }
      
      if(cardMovementComponent.moveTo !== undefined){
        this.addCard(cardMovementComponent, entity);
      }

      this.gameLoop?.removeComponentFromEntity(CardMovementComponent, entity);
    }

    private removeCard(cardMovementComponent: CardMovementComponent, entity: Entity): void {
      const cardsPileComponent: CardPileComponent = this.gameLoop?.getComponentFromEntity(cardMovementComponent.moveFrom!, entity)as CardPileComponent;

      cardsPileComponent.cards.delete(cardMovementComponent.card);
    }

    private addCard(cardMovementComponent: CardMovementComponent, entity: Entity): void {
      const cardsPileComponent: CardPileComponent = this.gameLoop?.getComponentFromEntity(cardMovementComponent.moveTo!, entity)as CardPileComponent;

      cardsPileComponent.cards.add(cardMovementComponent.card);
    }
  
}
