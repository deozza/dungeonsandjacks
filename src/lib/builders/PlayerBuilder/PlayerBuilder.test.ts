import GameLoop from "$lib/gameLoop/GameLoop";
import { describe, expect, it, vi } from "vitest";
import PlayerBuilder from "./PlayerBuilder";
import type { Entity } from "$lib/ECS/entities";
import DiscardComponent from "$lib/ECS/components/DiscardComponent";
import HandComponent from "$lib/ECS/components/HandComponent";
import DeckComponent from "$lib/ECS/components/DeckComponent";
import HealthComponent from "$lib/ECS/components/HealthComponent";
import DescriptionComponent from "$lib/ECS/components/DescriptionComponent";
import NameComponent from "$lib/ECS/components/NameComponent";

const values = {
  NameComponent: {
    content: 'test name'
  },
  DescriptionComponent: {
    content: 'test description'
  },
  HealthComponent: {
    maxHealth: 100
  },
  DeckComponent: {
    cards: {
      hearts: [1],
      spades: [1],
      diamonds: [1],
      clubs: [1],
    }
  }
  
}

describe('buildNameComponent', () => {
  it('adds NameComponent to entity according to values', () => {
    const gameLoop: GameLoop = new GameLoop();
    const playerBuilder: PlayerBuilder = new PlayerBuilder();
    playerBuilder.gameLoop = gameLoop;
    
    const playerEntity: Entity = gameLoop.addEntity();

    expect(gameLoop.getComponentsFromEntity(playerEntity)?.size).toBe(0);
    
    playerBuilder['buildNameComponent'](values, playerEntity);
    
    expect(gameLoop.getComponentsFromEntity(playerEntity)?.size).toBe(1);
    expect(gameLoop.entityHasAllComponents(playerEntity, new Set<Function>([NameComponent])));
    expect(gameLoop.getComponentFromEntity(NameComponent, playerEntity) as NameComponent).toEqual(values.NameComponent);
  });
});

describe('buildDescriptionComponent', () => {
  it('adds DescriptionComponent to entity according to values', () => {
    const gameLoop: GameLoop = new GameLoop();
    const playerBuilder: PlayerBuilder = new PlayerBuilder();
    playerBuilder.gameLoop = gameLoop;
    
    const playerEntity: Entity = gameLoop.addEntity();

    expect(gameLoop.getComponentsFromEntity(playerEntity)?.size).toBe(0);
    
    playerBuilder['buildDescriptionComponent'](values, playerEntity);
    
    expect(gameLoop.getComponentsFromEntity(playerEntity)?.size).toBe(1);
    expect(gameLoop.entityHasAllComponents(playerEntity, new Set<Function>([DescriptionComponent])));
    expect(gameLoop.getComponentFromEntity(DescriptionComponent, playerEntity) as DescriptionComponent).toEqual(values.DescriptionComponent);
  });
});

describe('buildHealthComponent', () => {
  it('adds HealthComponent to entity according to values', () => {
    const gameLoop: GameLoop = new GameLoop();
    const playerBuilder: PlayerBuilder = new PlayerBuilder();
    playerBuilder.gameLoop = gameLoop;

    const playerEntity: Entity = gameLoop.addEntity();
    
    expect(gameLoop.getComponentsFromEntity(playerEntity)?.size).toBe(0);
    
    playerBuilder['buildHealthComponent'](values, playerEntity);
    
    expect(gameLoop.getComponentsFromEntity(playerEntity)?.size).toBe(1);
    expect(gameLoop.entityHasAllComponents(playerEntity, new Set<Function>([HealthComponent])));
    
    expect(gameLoop.getComponentFromEntity(HealthComponent, playerEntity) as HealthComponent).toEqual({maxHealth: 100, currentHealth: 100});
  });
});

describe('buildDeckComponent', () => {
  it('adds DeckComponent to entity according to values', () => {
    const gameLoop: GameLoop = new GameLoop();
    const playerBuilder: PlayerBuilder = new PlayerBuilder();
    playerBuilder.gameLoop = gameLoop;
    
    const playerEntity: Entity = gameLoop.addEntity();
    
    expect(gameLoop.getComponentsFromEntity(playerEntity)?.size).toBe(0);
    
    playerBuilder['buildDeckComponent'](values, playerEntity);
    
    expect(gameLoop.getComponentsFromEntity(playerEntity)?.size).toBe(1);
    expect(gameLoop.entityHasAllComponents(playerEntity, new Set<Function>([DeckComponent])));

    const deckComponent: DeckComponent = gameLoop.getComponentFromEntity(DeckComponent, playerEntity) as DeckComponent;
    
    expect(deckComponent.cards.size).toBe(4);
  });
});

describe('buildHandComponent', () => {
  it('adds empty HandComponent', () => {
    const gameLoop: GameLoop = new GameLoop();
    const playerBuilder: PlayerBuilder = new PlayerBuilder();
    playerBuilder.gameLoop = gameLoop;

    const playerEntity: Entity = gameLoop.addEntity();
    
    expect(gameLoop.getComponentsFromEntity(playerEntity)?.size).toBe(0);
    
    playerBuilder['buildHandComponent'](playerEntity);
    
    expect(gameLoop.getComponentsFromEntity(playerEntity)?.size).toBe(1);
    expect(gameLoop.entityHasAllComponents(playerEntity, new Set<Function>([HandComponent])));
    expect(gameLoop.getComponentFromEntity(HandComponent, playerEntity) as HandComponent).toEqual(new HandComponent());
    
  });
});

describe('buildDiscardComponent', () => {
  it('adds empty DiscardComponent', () => {
    const gameLoop: GameLoop = new GameLoop();
    const playerBuilder: PlayerBuilder = new PlayerBuilder();
    playerBuilder.gameLoop = gameLoop;
    
    const playerEntity: Entity = gameLoop.addEntity();

    expect(gameLoop.getComponentsFromEntity(playerEntity)?.size).toBe(0);
    
    playerBuilder['buildDiscardComponent'](playerEntity);
    
    expect(gameLoop.getComponentsFromEntity(playerEntity)?.size).toBe(1);
    expect(gameLoop.entityHasAllComponents(playerEntity, new Set<Function>([DiscardComponent])));
    expect(gameLoop.getComponentFromEntity(DiscardComponent, playerEntity) as DiscardComponent).toEqual(new DiscardComponent());
    
  });
});

describe('build', () => {
  it('throws if no gameLoop', () => {
    const playerBuilder: PlayerBuilder = new PlayerBuilder();

    expect(() => playerBuilder.build(values)).toThrow();
  });
  
  it('calls other methods', () => {
    const gameLoop: GameLoop = new GameLoop();
    const playerBuilder: PlayerBuilder = new PlayerBuilder();
    playerBuilder.gameLoop = gameLoop;
    
    const buildNameComponentSpy = vi.spyOn(playerBuilder, 'buildNameComponent');
    const buildDescriptionComponent = vi.spyOn(playerBuilder, 'buildDescriptionComponent');
    const buildHealthComponent = vi.spyOn(playerBuilder, 'buildHealthComponent');
    const buildDeckComponent = vi.spyOn(playerBuilder, 'buildDeckComponent');
    const buildDiscardComponent = vi.spyOn(playerBuilder, 'buildDiscardComponent');
    const buildHandComponent = vi.spyOn(playerBuilder, 'buildHandComponent');

    playerBuilder.build(values);

    expect(buildNameComponentSpy).toHaveBeenCalledTimes(1);
    expect(buildDescriptionComponent).toHaveBeenCalledTimes(1);
    expect(buildHealthComponent).toHaveBeenCalledTimes(1);
    expect(buildDeckComponent).toHaveBeenCalledTimes(1);
    expect(buildDiscardComponent).toHaveBeenCalledTimes(1);
    expect(buildHandComponent).toHaveBeenCalledTimes(1);
  });
});
