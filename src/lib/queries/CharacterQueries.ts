import CardRankComponent from "$lib/ECS/components/CardRankComponent";
import CardSuitComponent from "$lib/ECS/components/CardSuitComponent";
import DeckComponent from "$lib/ECS/components/DeckComponent";
import DiscardComponent from "$lib/ECS/components/DiscardComponent";
import EnemyFlagComponent from "$lib/ECS/components/EnemyFlagComponent";
import HandBustedFlagComponent from "$lib/ECS/components/HandBustedFlagComponent";
import HandComponent from "$lib/ECS/components/HandComponent";
import HealthComponent from "$lib/ECS/components/HealthComponent";
import NameComponent from "$lib/ECS/components/NameComponent";
import PlayerFlagComponent from "$lib/ECS/components/PlayerFlagComponent";
import type { Entity } from "$lib/ECS/entities";
import GameLoop from "$lib/gameLoop/GameLoop";

export function getPlayerEntity(gameLoop:GameLoop): Entity {
  const entities = gameLoop.getEntitiesByComponents(new Set<Function>([PlayerFlagComponent]));
  if(entities === undefined || entities.length !== 1) {
    throw new Error("Game bork");
  }

  return entities[0];
}

export function getEnemyEntity(gameLoop: GameLoop): Entity {
  const entities = gameLoop.getEntitiesByComponents(new Set<Function>([EnemyFlagComponent]));
  if(entities === undefined || entities.length !== 1) {
    throw new Error("Game bork");
  }

  return entities[0];
}

export function getCardPile(gameLoop: GameLoop, entity: Entity, pileTypeComponent: string): Array<{cardRank: CardRankComponent, cardSuit: CardSuitComponent}> {
	if(pileTypeComponent === 'deck') {
		return getDeckPile(gameLoop, entity);
	}
	
	if(pileTypeComponent === 'discard') {
		return getDiscardPile(gameLoop, entity);
	}
	
	if(pileTypeComponent === 'hand') {
		return getHandPile(gameLoop, entity);
	}

	throw new Error('game bork');
}


export function getCharacterName(gameLoop: GameLoop, entity: Entity): NameComponent {
  return gameLoop.getComponentFromEntity(NameComponent, entity) as NameComponent;
}

export function getCharacterHealth(gameLoop: GameLoop, entity: Entity): HealthComponent {
  return gameLoop.getComponentFromEntity(HealthComponent, entity) as HealthComponent;
}

export function getHandValue(gameLoop: GameLoop, entity: Entity): number {
		const handComponent: HandComponent = gameLoop.getComponentFromEntity(HandComponent,entity) as HandComponent;
		return handComponent.value;
}

export function hasBustedHand(gameLoop: GameLoop, entity: Entity): boolean {
	return gameLoop.entityHasAllComponents(entity, new Set([HandBustedFlagComponent]));
}

export function checkCardPileIsNotClickable(gameLoop: GameLoop, entity: Entity, pileType: string): boolean {
	const isPlayer: boolean = gameLoop.entityHasAllComponents(entity, new Set([PlayerFlagComponent]));
	if(isPlayer === true) {
		if(pileType === 'deck') {
			return hasBustedHand(gameLoop, entity) === true;
		}

		return false;
	}

	return pileType !== 'discard';
}


function getHandPile(gameLoop: GameLoop, entity: Entity): Array<{cardRank: CardRankComponent, cardSuit: CardSuitComponent}> {
		const handComponent: HandComponent = gameLoop.getComponentFromEntity(HandComponent,entity) as HandComponent;
		return buildCardPile(gameLoop, handComponent.cards);
}


function getDeckPile(gameLoop: GameLoop, entity: Entity): Array<{cardRank: CardRankComponent, cardSuit: CardSuitComponent}> {
		const deckComponent: DeckComponent = gameLoop!.getComponentFromEntity(DeckComponent,entity) as DeckComponent;
		return buildCardPile(gameLoop,deckComponent.cards);
}

function getDiscardPile(gameLoop: GameLoop, entity: Entity): Array<{cardRank: CardRankComponent, cardSuit: CardSuitComponent}> {
		const discardComponent: DiscardComponent = gameLoop!.getComponentFromEntity(DiscardComponent,entity) as DiscardComponent;
		return buildCardPile(gameLoop, discardComponent.cards);
}

function buildCardPile(gameLoop: GameLoop, cardEntities: Set<Entity>): Array<{cardRank: CardRankComponent, cardSuit: CardSuitComponent}> {
		const hand: Array<{cardRank: CardRankComponent, cardSuit: CardSuitComponent}> = [];
		for(const card of cardEntities) {
			const cardRank: CardRankComponent = gameLoop.getComponentFromEntity(CardRankComponent, card) as CardRankComponent;
			const cardSuit: CardSuitComponent = gameLoop.getComponentFromEntity(CardSuitComponent, card) as CardSuitComponent;

			hand.push({cardRank, cardSuit});
		}

		return hand;
}


