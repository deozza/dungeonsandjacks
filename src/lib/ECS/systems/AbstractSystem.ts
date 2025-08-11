import type GameLoop from "$lib/gameLoop/GameLoop";
import type ComponentInterface from "../components/ComponentInterface";
import type { Entity } from "../entities";

export default abstract class AbstractSystem {
    public abstract update(entities: Set<Entity>): void;
    public abstract requiredComponents: Set<Function>;
    public enabled: boolean = true;
    public gameLoop: GameLoop | undefined = undefined;

    // public getComponentFromEntity(entity: Entity, componentType: Function): ComponentInterface | undefined {
    //     return this.gameLoop.getComponents(entity)?.get(componentType);
    // }
}
