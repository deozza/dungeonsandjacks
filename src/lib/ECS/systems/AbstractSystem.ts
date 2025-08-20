import type GameLoop from "$lib/gameLoop/GameLoop";
import type ComponentInterface from "../components/ComponentInterface";
import type { Entity } from "../entities";

export default abstract class AbstractSystem {
    public abstract update(entities: Set<Entity>): void;
    public abstract requiredComponents: Set<Function>;
    public abstract listensOnEvents: Set<Function>;
    public abstract excludedComponents: Set<Function>;
    
    public enabled: boolean = true;
    public gameLoop: GameLoop | undefined = undefined;


    protected componentsOfEntityIntersectsWith(entity: Entity, componentsToCheck: Set<Function>): boolean {
        const componentsOfEntity: Map<Function, ComponentInterface> | undefined = this.gameLoop?.getComponentsFromEntity(entity);

        if(componentsOfEntity === undefined) {
            return false;
        }

        const componentsFunctionOfEntity: MapIterator<Function> = componentsOfEntity.keys();

        if([...componentsToCheck.values()].some((event: Function) =>[...componentsFunctionOfEntity].includes(event)) === true) {
            return true;
        }
        
        return false;
        
    }

    protected hasEvents(entity: Entity): boolean {
        return this.componentsOfEntityIntersectsWith(entity, this.listensOnEvents);
    }

    public shouldIgnoreEntity(entity: Entity): boolean {
        if(this.excludedComponents.size === 0) {
            return false;
        }
        return this.componentsOfEntityIntersectsWith(entity, this.excludedComponents);
    }

}
