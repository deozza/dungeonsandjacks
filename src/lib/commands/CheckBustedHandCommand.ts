import type CardRankComponent from "$lib/ECS/components/CardRankComponent";
import type CardSuitComponent from "$lib/ECS/components/CardSuitComponent";
import type { Entity } from "$lib/ECS/entities";
import type GameLoop from "$lib/gameLoop/GameLoop";
import { getCardPile } from "$lib/queries/CharacterQueries";
import AbstractCommand from "./AbstractCommand";

export default class CheckBustedHandCommand extends AbstractCommand{
    public execute(gameLoop: GameLoop, actor: Entity | null, data: any): void {
      if(actor === null) {
        throw new Error("game bork");
      }

      const handPile: Array<{cardRank: CardRankComponent, cardSuit: CardSuitComponent}> = getCardPile(gameLoop, actor, 'hand');

      
    }
    
    public undo(gameLoop: GameLoop, actor: Entity | null): void {
        throw new Error("Method not implemented.");
    }
    
    public redo(gameLoop: GameLoop, actor: Entity | null): void {
        throw new Error("Method not implemented.");
    }
  
}
