import DeckComponent from "$lib/ECS/components/DeckComponent";
import DiscardComponent from "$lib/ECS/components/DiscardComponent";
import HandComponent from "$lib/ECS/components/HandComponent";
import type { Entity } from "$lib/ECS/entities";
import AbstractSystem from "../AbstractSystem";

export default class RoundSystem extends AbstractSystem {
    public requiredComponents: Set<Function> = new Set([HandComponent, DeckComponent, DiscardComponent]);
    public listensOnEvents: Set<Function> = new Set([]);
    public excludedComponents: Set<Function> = new Set([]);
  
    public update(entities: Set<Entity>): void {
        
    }
}
