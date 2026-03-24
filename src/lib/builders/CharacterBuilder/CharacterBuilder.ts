import DeckComponent from "$lib/ECS/components/DeckComponent";
import DescriptionComponent from "$lib/ECS/components/DescriptionComponent";
import DiscardComponent from "$lib/ECS/components/DiscardComponent";
import HandComponent from "$lib/ECS/components/HandComponent";
import HealthComponent from "$lib/ECS/components/HealthComponent";
import NameComponent from "$lib/ECS/components/NameComponent";
import type { Entity } from "$lib/ECS/entities";
import AbstractBuilder from "../AbstractBuilder";
import CardBuilder from "../CardBuilder/CardBuilder";

export type CharacterModel = {
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
      spades: number[],
      diamonds: number[],
      clubs: number[],
    }
  }
};

export default class CharacterBuilder extends AbstractBuilder {

    public static instance: CharacterBuilder | undefined = undefined;

    public getInstance(): CharacterBuilder {
      if(CharacterBuilder.instance === undefined) {
        CharacterBuilder.instance = new CharacterBuilder();
      }

      return CharacterBuilder.instance;
    }
  
  
    public build(values: CharacterModel): Entity {
      if(this.gameLoop === undefined) {
        throw 'gameLoop must be instanciated before using a builder';
      }
      
      const characterEntity: Entity = this.gameLoop.addEntity();

      this.buildNameComponent(values, characterEntity);
      this.buildDescriptionComponent(values, characterEntity);
      this.buildHealthComponent(values, characterEntity);
      this.buildDeckComponent(values, characterEntity);
      this.buildHandComponent(characterEntity);
      this.buildDiscardComponent(characterEntity);

      return characterEntity;
    }

    private buildNameComponent(values: CharacterModel, characterEntity: Entity): void {
      const nameComponent: NameComponent = new NameComponent();
      nameComponent.content = values.NameComponent.content;

      this.gameLoop?.addComponentToEntity(nameComponent, characterEntity);
    }

    private buildDescriptionComponent(values: CharacterModel, characterEntity: Entity): void {
      const descriptionComponent: DescriptionComponent = new DescriptionComponent();
      descriptionComponent.content = values.DescriptionComponent.content;

      this.gameLoop?.addComponentToEntity(descriptionComponent, characterEntity);
      
    }

    private buildHealthComponent(values: CharacterModel, characterEntity: Entity): void {
      const healthComponent: HealthComponent = new HealthComponent();
      healthComponent.maxHealth = values.HealthComponent.maxHealth;
      healthComponent.currentHealth = healthComponent.maxHealth;

      this.gameLoop?.addComponentToEntity(healthComponent, characterEntity);
      
    }

    private buildDeckComponent(values: CharacterModel, characterEntity: Entity): void {
      const cardBuilder: CardBuilder = new CardBuilder();
      cardBuilder.gameLoop = this.gameLoop;
      
      const deckComponent: DeckComponent = new DeckComponent();
      for(const suit in values.DeckComponent.cards) {
        for(const rank of values.DeckComponent.cards[suit]) {
          const cardEntity: Entity  = cardBuilder.build({cardRank: rank, cardSuit: suit})

          deckComponent.cards.add(cardEntity);
        }
      }

      this.gameLoop?.addComponentToEntity(deckComponent, characterEntity);
    }

    private buildHandComponent(characterEntity: Entity): void {
      const handComponent: HandComponent = new HandComponent();
      
      this.gameLoop?.addComponentToEntity(handComponent, characterEntity);
    }

    private buildDiscardComponent(characterEntity: Entity): void {
      const discardComponent: DiscardComponent = new DiscardComponent();
      
      this.gameLoop?.addComponentToEntity(discardComponent, characterEntity);
      
    }
}
