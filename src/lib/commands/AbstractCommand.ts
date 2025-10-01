import type { Entity } from "$lib/ecs/entities";
import type GameLoop from "$lib/gameLoop/GameLoop";

export default abstract class AbstractCommand {
    public abstract execute(gameLoop: GameLoop, actor: Entity | null, data: any): void;
    public abstract undo(gameLoop: GameLoop, actor: Entity | null): void;
    public abstract redo(gameLoop: GameLoop, actor: Entity | null): void;
}
