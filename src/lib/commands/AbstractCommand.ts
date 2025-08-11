import type { Entity } from "$lib/ecs/entities";

export default abstract class AbstractCommand {
    public abstract execute(actor: Entity): void;
    public abstract undo(actor: Entity): void;
    public abstract redo(actor: Entity): void;
}
