import CardMovementComponent from "$lib/ECS/components/CardMovementComponent";
import CardRankComponent from "$lib/ECS/components/CardRankComponent";
import CardSuitComponent from "$lib/ECS/components/CardSuitComponent";
import DeckComponent from "$lib/ECS/components/DeckComponent";
import DiscardComponent from "$lib/ECS/components/DiscardComponent";
import HandComponent from "$lib/ECS/components/HandComponent";
import type { Entity } from "$lib/ECS/entities";
import GameLoop from "$lib/gameLoop/GameLoop";
import { describe, expect, it } from "vitest";
import CardMovementSystem from "./CardMovementSystem";
import CardBuilder from "$lib/builders/CardBuilder/CardBuilder";

describe('update', () => {
  const cases = [
    {
      moveFrom: DeckComponent,
      moveTo: HandComponent,
      sizeOfHandBefore: 0,
      sizeOfDeckBefore: 2,
      sizeOfDiscardBefore: 0,
      sizeOfHandAfter: 1,
      sizeOfDeckAfter: 1,
      sizeOfDiscardAfter: 0,
      testName: 'from deck to hand'
    },
    {
      moveFrom: DiscardComponent,
      moveTo: HandComponent,
      sizeOfHandBefore: 0,
      sizeOfDeckBefore: 0,
      sizeOfDiscardBefore: 2,
      sizeOfHandAfter: 1,
      sizeOfDeckAfter: 0,
      sizeOfDiscardAfter: 1,
      testName: 'from deck to discard'
    },
    {
      moveFrom: HandComponent,
      moveTo: DiscardComponent,
      sizeOfHandBefore: 2,
      sizeOfDeckBefore: 0,
      sizeOfDiscardBefore: 0,
      sizeOfHandAfter: 1,
      sizeOfDeckAfter: 0,
      sizeOfDiscardAfter: 1,
      testName: 'from hand to discard'
    },
    {
      moveFrom: HandComponent,
      moveTo: DeckComponent,
      sizeOfHandBefore: 2,
      sizeOfDeckBefore: 0,
      sizeOfDiscardBefore: 0,
      sizeOfHandAfter: 1,
      sizeOfDeckAfter: 1,
      sizeOfDiscardAfter: 0,
      testName: 'from hand to deck'
    },
    {
      moveFrom: DiscardComponent,
      moveTo: HandComponent,
      sizeOfHandBefore: 0,
      sizeOfDeckBefore: 0,
      sizeOfDiscardBefore: 2,
      sizeOfHandAfter: 1,
      sizeOfDeckAfter: 0,
      sizeOfDiscardAfter: 1,
      testName: 'from discard to hand'
    },
    {
      moveFrom: DiscardComponent,
      moveTo: DeckComponent,
      sizeOfHandBefore: 0,
      sizeOfDeckBefore: 0,
      sizeOfDiscardBefore: 2,
      sizeOfHandAfter: 0,
      sizeOfDeckAfter: 1,
      sizeOfDiscardAfter: 1,
      testName: 'from discard to deck'
    },
    {
      moveFrom: undefined,
      moveTo: DeckComponent,
      sizeOfHandBefore: 0,
      sizeOfDeckBefore: 0,
      sizeOfDiscardBefore: 0,
      sizeOfHandAfter: 0,
      sizeOfDeckAfter: 1,
      sizeOfDiscardAfter: 0,
      testName: 'add to deck'
    },
    {
      moveFrom: undefined,
      moveTo: HandComponent,
      sizeOfHandBefore: 0,
      sizeOfDeckBefore: 0,
      sizeOfDiscardBefore: 0,
      sizeOfHandAfter: 1,
      sizeOfDeckAfter: 0,
      sizeOfDiscardAfter: 0,
      testName: 'add to hand'
    },
    {
      moveFrom: undefined,
      moveTo: DiscardComponent,
      sizeOfHandBefore: 0,
      sizeOfDeckBefore: 0,
      sizeOfDiscardBefore: 0,
      sizeOfHandAfter: 0,
      sizeOfDeckAfter: 0,
      sizeOfDiscardAfter: 1,
      testName: 'add to discard'
    },
  ];

  cases.forEach(testCase => {
    const gameLoop: GameLoop = new GameLoop();
    gameLoop.addSystem(new CardMovementSystem());

    const cardBuilder: CardBuilder = new CardBuilder();
    cardBuilder.gameLoop = gameLoop;
    const cardEntity: Entity = cardBuilder.build({cardRank: 1, cardSuit: 'spades'});
    const cardEntity2: Entity = cardBuilder.build({cardRank: 10, cardSuit: 'hearts'});

    const playerEntity: Entity = gameLoop.addEntity();

    const deckComponent: DeckComponent = new DeckComponent();
    const discardComponent: DiscardComponent = new DiscardComponent();
    const handComponent: HandComponent = new HandComponent();
    gameLoop.addComponentToEntity(deckComponent, playerEntity);
    gameLoop.addComponentToEntity(discardComponent, playerEntity);
    gameLoop.addComponentToEntity(handComponent, playerEntity);

    
    it('checks movement '+testCase.testName, () => {
      if(testCase.moveFrom === DeckComponent) {
        deckComponent.cards.add(cardEntity);
        deckComponent.cards.add(cardEntity2);
      }
      if(testCase.moveFrom === HandComponent) {
        handComponent.cards.add(cardEntity);
        handComponent.cards.add(cardEntity2);
      }
      if(testCase.moveFrom === DiscardComponent) {
        discardComponent.cards.add(cardEntity);
        discardComponent.cards.add(cardEntity2);
      }
      
      expect(deckComponent.cards.size).toBe(testCase.sizeOfDeckBefore)
      expect(discardComponent.cards.size).toBe(testCase.sizeOfDiscardBefore)
      expect(handComponent.cards.size).toBe(testCase.sizeOfHandBefore)

      const cardMovementComponent: CardMovementComponent = new CardMovementComponent();
      cardMovementComponent.card = cardEntity;
      cardMovementComponent.moveFrom = testCase.moveFrom;
      cardMovementComponent.moveTo = testCase.moveTo;

      gameLoop.addComponentToEntity(cardMovementComponent, playerEntity);

      gameLoop.update();

      expect(deckComponent.cards.size).toBe(testCase.sizeOfDeckAfter)
      expect(discardComponent.cards.size).toBe(testCase.sizeOfDiscardAfter)
      expect(handComponent.cards.size).toBe(testCase.sizeOfHandAfter)
    })
  })
});
