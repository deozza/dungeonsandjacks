import CardRankComponent from "$lib/ECS/components/CardRankComponent";
import CardSuitComponent from "$lib/ECS/components/CardSuitComponent";
import type { Entity } from "$lib/ECS/entities";
import AbstractBuilder from "../AbstractBuilder";

type CardModel = {
  cardRank: number,
  cardSuit: string
};

export default class CardBuilder extends AbstractBuilder {
  public build(values: CardModel): Entity {

    if(this.gameLoop === undefined) {
      throw 'gameLoop must be instanciated before using a builder';
    }
    
    const cardEntity: Entity = this.gameLoop.addEntity();
    const cardRankComponent: CardRankComponent = new CardRankComponent();
    cardRankComponent.value = values.cardRank;

    const cardSuitComponent: CardSuitComponent = new CardSuitComponent();
    cardSuitComponent.suit = values.cardSuit;

    this.gameLoop.addComponentToEntity(cardRankComponent, cardEntity);
    this.gameLoop.addComponentToEntity(cardSuitComponent, cardEntity);

    return cardEntity;
  }
}
