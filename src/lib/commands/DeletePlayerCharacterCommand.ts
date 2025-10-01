import DeckComponent from "$lib/ECS/components/DeckComponent";
import HealthComponent from "$lib/ECS/components/HealthComponent";
import type { Entity } from "$lib/ECS/entities";
import type GameLoop from "$lib/gameLoop/GameLoop";
import AbstractCommand from "./AbstractCommand";

export default class DeletePlayerCharacterCommand extends AbstractCommand {
    public execute(gameLoop: GameLoop, actor: Entity | null, data: any): void {
        const playerCharacterEntity: Entity[] = gameLoop.getEntitiesByComponents(new Set<Function>([HealthComponent, DeckComponent]));
        gameLoop.removeEntity(playerCharacterEntity[0])

    }
    public undo(gameLoop: GameLoop, actor: Entity | null): void {
        throw new Error("Method not implemented.");
    }
    public redo(gameLoop: GameLoop, actor: Entity | null): void {
        throw new Error("Method not implemented.");
    }
  
}
