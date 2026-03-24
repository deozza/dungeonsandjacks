import DeckComponent from "$lib/ECS/components/DeckComponent";
import type { Entity } from "$lib/ECS/entities";
import type GameLoop from "$lib/gameLoop/GameLoop";
import AbstractCommand from "./AbstractCommand";

export default class ShuffleDeckCommand extends AbstractCommand {
    public execute(gameLoop: GameLoop, actor: Entity | null, data: any): void {
      if(actor === null) {
        throw new Error("Actor can't be null");
      }
      
      const deckComponent:DeckComponent = gameLoop.getComponentFromEntity(DeckComponent, actor) as DeckComponent;
      deckComponent.cards = new Set(Array.from(deckComponent.cards).sort(() => Math.random() - 0.5))
    }
    
    public undo(gameLoop: GameLoop, actor: Entity | null): void {
        throw new Error("Method not implemented.");
    }
    public redo(gameLoop: GameLoop, actor: Entity | null): void {
        throw new Error("Method not implemented.");
    }
}
