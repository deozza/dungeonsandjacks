import CardMovementComponent from "$lib/ECS/components/CardMovementComponent";
import DeckComponent from "$lib/ECS/components/DeckComponent";
import HandComponent from "$lib/ECS/components/HandComponent";
import type { Entity } from "$lib/ECS/entities";
import type GameLoop from "$lib/gameLoop/GameLoop";
import AbstractCommand from "./AbstractCommand";
import CheckBustedHandCommand from "./CheckBustedHandCommand";

export default class DrawCardCommand extends AbstractCommand {
  public execute(gameLoop: GameLoop, actor: Entity | null, data: any): void {

    if(actor === null) {
      throw new Error("Game bork");
    }
        
		const deckComponent: DeckComponent = gameLoop?.getComponentFromEntity(DeckComponent, actor) as DeckComponent;
    const card = deckComponent.cards.values().next().value;

    if(card === undefined) {
      throw new Error("Game bork")
    }

    const cardMovementComponent: CardMovementComponent = new CardMovementComponent();
    cardMovementComponent.card = card;
    cardMovementComponent.moveFrom = DeckComponent;
    cardMovementComponent.moveTo = HandComponent;

    gameLoop?.addComponentToEntity(cardMovementComponent, actor);
    
		const checkBustedHandCommand: CheckBustedHandCommand = new CheckBustedHandCommand();
		checkBustedHandCommand.execute(gameLoop!, actor, null);
  }
  
  public undo(gameLoop: GameLoop, actor: Entity | null): void {
      throw new Error("Method not implemented.");
  }
  public redo(gameLoop: GameLoop, actor: Entity | null): void {
      throw new Error("Method not implemented.");
  }
  
}
