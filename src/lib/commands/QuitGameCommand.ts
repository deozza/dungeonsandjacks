import type { Entity } from "$lib/ECS/entities";
import GameLoop from "$lib/gameLoop/GameLoop";
import AbstractCommand from "./AbstractCommand";
import DeletePlayerCharacterCommand from "./DeletePlayerCharacterCommand";
import ResetStateMachinesCommand from "./ResetStateMachinesCommand";

export default class QuitGameCommand extends AbstractCommand {
    public execute(gameLoop: GameLoop, actor: Entity | null, data: any): void {
        const resetStateMachinesCommand: ResetStateMachinesCommand = new ResetStateMachinesCommand();
        resetStateMachinesCommand.execute(gameLoop, actor, data);
        
        const deletePlayerCharacterCommand: DeletePlayerCharacterCommand = new DeletePlayerCharacterCommand();
        deletePlayerCharacterCommand.execute(gameLoop, actor, data);
    }
    public undo(gameLoop: GameLoop, actor: Entity | null): void {
        throw new Error("Method not implemented.");
    }
    public redo(gameLoop: GameLoop, actor: Entity | null): void {
        throw new Error("Method not implemented.");
    }
  
}
