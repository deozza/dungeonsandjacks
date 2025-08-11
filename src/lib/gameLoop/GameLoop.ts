import { type Entity } from '$lib/ECS/entities/index';
import type ComponentInterface from '$lib/ECS/components/ComponentInterface';
import AbstractSystem from '$lib/ECS/systems/AbstractSystem';

export default class GameLoop {
  private readonly entities: Map<Entity, Map<Function, ComponentInterface>> = new Map([]);
  private readonly entitiesToRemove: Array<Entity> = [];
  private readonly systems: Map<AbstractSystem, Set<Entity>> = new Map([]);
  
  private currentEntityId: Entity = 0;

  public update(): void {
    for (const [system, entities] of this.systems.entries()) {
      system.update(entities);
    }

    while (this.entitiesToRemove.length > 0) {
      const entityToRemove: Entity | undefined = this.entitiesToRemove.pop();
      if(entityToRemove !== undefined) {
          this.removeEntityFromSystems(entityToRemove);
      }
    }
  }

  public addEntity(): Entity {
    const newEntity: Entity = this.currentEntityId;
    this.entities.set(newEntity, new Map<Function, ComponentInterface>());
    this.currentEntityId++;

    return newEntity;
  }

  public getEntities(): Array<Entity> {
    return [...this.entities.keys()];
  }

  public getEntitiesByComponents(componentsToMatch: Set<Function>): Entity[] {
    const entities: Entity[] = [];
    for(const entity of this.entities.keys()) {
      if(this.entityHasAllComponents(entity, componentsToMatch) === true) {
        entities.push(entity);
      }
    }

    return entities;
  }

  public removeEntity(entity: Entity): void {
    if(this.entitiesToRemove.find((entityToRemove) => entityToRemove === entity) !== undefined) {
      return;
    }

    if(this.entities.get(entity) === undefined) {
      return;
    }
    
    this.entitiesToRemove.push(entity);

    return;
  }

  public entityHasAllComponents(entity: Entity, components: Set<Function>): boolean {
    if(this.entities.get(entity) === undefined) {
      return false;
    }
    for(const component of components.values()){
      if(this.entities.get(entity)?.has(component) === false) {
        return false;
      }
    }

    return true;
  }

  public addComponentToEntity(component: ComponentInterface, entity: Entity): void {

    if(this.entities.get(entity)?.has(component.constructor)) {
      return;
    }
    
    this.entities.get(entity)?.set(component.constructor, component);
    this.manageEntityForSystems(entity);
   
    return;
  }

  public getComponentsFromEntity(entity: Entity): Map<Function, ComponentInterface> | undefined {
    return this.entities.get(entity);
  }

  public getComponentFromEntity(component: Function, entity: Entity): ComponentInterface | undefined {
    return this.entities.get(entity)?.get(component);
  }  

  public removeComponentFromEntity(component: Function, entity: Entity): void {
    this.entities.get(entity)?.delete(component);
    
    this.manageEntityForSystems(entity);
    return;
  }

  public addSystem(systemToAdd: AbstractSystem): void {

    if(this.getSystemAndEntities(systemToAdd.constructor) !== undefined) {
      return;
    }
    
    systemToAdd.gameLoop = this;
    this.systems.set(systemToAdd, new Set<Entity>([]));

    for(const entity of this.entities.keys()) {
      this.manageEntityForSystems(entity);
    }

    return;
  }

  public getSystemAndEntities(systemToFind: Function): [AbstractSystem, Set<Entity>] | undefined {
    for(const mapIterator of this.systems.entries()) {
      if(mapIterator[0].constructor === systemToFind) {
        return mapIterator;
      }
    }

    return undefined;
  }

  public removeSystem(systemToRemove: Function): void {

    const system: [AbstractSystem, Set<Entity>] | undefined = this.getSystemAndEntities(systemToRemove);
    if(system === undefined) {
      return;
    }

    this.systems.delete(system[0]);

    return;
  }

  private manageEntityForSystems(entity: Entity): void {
    for (const system of this.systems.keys()) {
      if (this.entityHasAllComponents(entity, system.requiredComponents)) {
        if(!this.systems.get(system)?.has(entity)) {
            this.systems.get(system)?.add(entity);
        }
      } else {
        this.systems.get(system)?.delete(entity);
      }
    }
  }
  
  private removeEntityFromSystems(entity: Entity): void {
    this.entities.delete(entity);
    
    for (const system of this.systems.values()) {
      system.delete(entity);
    }

    return;
  }
}
