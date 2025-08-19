import DeckComponent from "$lib/ECS/components/DeckComponent";
import DescriptionComponent from "$lib/ECS/components/DescriptionComponent";
import DiscardComponent from "$lib/ECS/components/DiscardComponent";
import HandComponent from "$lib/ECS/components/HandComponent";
import HealthComponent from "$lib/ECS/components/HealthComponent";
import NameComponent from "$lib/ECS/components/NameComponent";
import type { Entity } from "$lib/ECS/entities";
import AbstractBuilder from "../AbstractBuilder";
import CardBuilder from "../CardBuilder/CardBuilder";

type PlayerModel = {
  NameComponent: {
    content: string
  },
  DescriptionComponent: {
    content: string
  },
  HealthComponent: {
    maxHealth: number
  },
  DeckComponent: {
    cards: {
      hearts: number[],
      aces: number[],
      diamonds: number[],
      clubs: number[],
    }
  }
};

export default class PlayerBuilder extends AbstractBuilder {
    public build(values: PlayerModel): Entity {
      if(this.gameLoop === undefined) {
        throw 'gameLoop must be instanciated before using a builder';
      }
      
      const playerEntity: Entity = this.gameLoop.addEntity();

      this.buildNameComponent(values, playerEntity);
      this.buildDescriptionComponent(values, playerEntity);
      this.buildHealthComponent(values, playerEntity);
      this.buildDeckComponent(values, playerEntity);
      this.buildHandComponent(playerEntity);
      this.buildDiscardComponent(playerEntity);

      return playerEntity;
    }

    private buildNameComponent(values: PlayerModel, playerEntity: Entity): void {
      const nameComponent: NameComponent = new NameComponent();
      nameComponent.content = values.NameComponent.content;

      this.gameLoop?.addComponentToEntity(nameComponent, playerEntity);
    }

    private buildDescriptionComponent(values: PlayerModel, playerEntity: Entity): void {
      const descriptionComponent: DescriptionComponent = new DescriptionComponent();
      descriptionComponent.content = values.DescriptionComponent.content;

      this.gameLoop?.addComponentToEntity(descriptionComponent, playerEntity);
      
    }

    private buildHealthComponent(values: PlayerModel, playerEntity: Entity): void {
      const healthComponent: HealthComponent = new HealthComponent();
      healthComponent.maxHealth = values.HealthComponent.maxHealth;
      healthComponent.currentHealth = healthComponent.maxHealth;

      this.gameLoop?.addComponentToEntity(healthComponent, playerEntity);
      
    }

    private buildDeckComponent(values: PlayerModel, playerEntity: Entity): void {
      const cardBuilder: CardBuilder = new CardBuilder();
      cardBuilder.gameLoop = this.gameLoop;
      
      const deckComponent: DeckComponent = new DeckComponent();
      for(const suit in values.DeckComponent.cards) {
        for(const rank of values.DeckComponent.cards[suit]) {
          const cardEntity: Entity  = cardBuilder.build({cardRank: rank, cardSuit: suit})

          deckComponent.cards.add(cardEntity);
        }
      }

      this.gameLoop?.addComponentToEntity(deckComponent, playerEntity);
    }

    private buildHandComponent(playerEntity: Entity): void {
      const handComponent: HandComponent = new HandComponent();
      
      this.gameLoop?.addComponentToEntity(handComponent, playerEntity);
    }

    private buildDiscardComponent(playerEntity: Entity): void {
      const discardComponent: DiscardComponent = new DiscardComponent();
      
      this.gameLoop?.addComponentToEntity(discardComponent, playerEntity);
      
    }
}
