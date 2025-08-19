import GameLoop from "$lib/gameLoop/GameLoop";
import { describe, expect, it } from "vitest";
import CardBuilder from "./CardBuilder";
import type { Entity } from "$lib/ECS/entities";
import CardRankComponent from "$lib/ECS/components/CardRankComponent";
import CardSuitComponent from "$lib/ECS/components/CardSuitComponent";
import type ComponentInterface from "$lib/ECS/components/ComponentInterface";

describe('build', () => {
  it('throws if no gameLoop', () => {
    const cardBuilder: CardBuilder = new CardBuilder();

    expect(() => cardBuilder.build({cardRank: 1, cardSuit: 'spade'})).toThrow();
  });

  it('adds entity in gameLoop', () => {
    const gameLoop: GameLoop = new GameLoop();

    expect(gameLoop.getEntities().length).toBe(0);

    const cardBuilder: CardBuilder = new CardBuilder();
    cardBuilder.gameLoop = gameLoop;

    cardBuilder.build({cardRank: 1, cardSuit: 'spade'});
    
    expect(gameLoop.getEntities().length).toBe(1);
  });
  
  it('attaches correct components to entity', () => {
    const gameLoop: GameLoop = new GameLoop();
    const cardBuilder: CardBuilder = new CardBuilder();
    cardBuilder.gameLoop = gameLoop;

    const cardEntity: Entity = cardBuilder.build({cardRank: 1, cardSuit: 'spade'});
    const components: Map<Function, ComponentInterface>  | undefined = gameLoop.getComponentsFromEntity(cardEntity);

    const expectedCardRankComponent: CardRankComponent = new CardRankComponent();
    expectedCardRankComponent.value = 1;
    
    const expectedCardSuitComponent: CardSuitComponent = new CardSuitComponent();
    expectedCardSuitComponent.suit = 'spade';

    expect(components).toEqual(new Map<Function, ComponentInterface>([
      [CardSuitComponent, expectedCardSuitComponent],
      [CardRankComponent, expectedCardRankComponent],
    ]))
    
  });
})
