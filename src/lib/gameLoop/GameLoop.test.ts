import { describe, it, expect, vi } from 'vitest';
import GameLoop from '$lib/gameLoop/GameLoop.ts';
import type Entity from '$lib/ECS/entity/index.ts';
import ComponentInterface from '$lib/ECS/components/ComponentInterface.ts';
import AbstractSystem from '$lib/ECS/systems/AbstractSystem.ts';

class DummyComponent implements ComponentInterface {
  value: string = "Hello World";
}

class DummySystem extends AbstractSystem {
    public update(entities: Set<Entity>): void {
        
    }
    public requiredComponents: Set<Function> = new Set<Function>([DummyComponent]);
    constructor() {
        super();
    }

}

class DummySystem2 extends AbstractSystem {
    public update(entities: Set<Entity>): void {
        
    }
    public requiredComponents: Set<Function> = new Set<Function>([DummyComponent]);
    constructor() {
        super();
    }

}

describe('getEntities', () => {
  // it('should return Array<Entity>', () => {
  //   const gameLoop: GameLoop = new GameLoop();
  //   gameLoop['entities'] = [0, 1, 2];

  //   const entities = gameLoop.getEntities();

  //   expectTypeOf(entities).toEqualTypeOf<Entity[]>();
  // });
  
  it('should return list of entities', () => {
    const gameLoop: GameLoop = new GameLoop();
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [1, new Map<Function, ComponentInterface>()],
      [2, new Map<Function, ComponentInterface>()]
    ]);

    expect(gameLoop.getEntities().length).toBe(3);
    expect(gameLoop.getEntities()).toStrictEqual([0, 1, 2]);
  });
});

describe('addEntity', () => {
  
  it('should add to the game entity list', () => {
    const gameLoop: GameLoop = new GameLoop();
    
    expect(gameLoop['entities'].size).toBe(0);

    gameLoop.addEntity();

    const expectedGameLoopEntities = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([])]
    ]);

    expect(gameLoop['entities'].size).toBe(1);
    expect(gameLoop['entities']).toEqual(expectedGameLoopEntities);
  });

  // it('should return Entity', () => {
  //   const gameLoop: GameLoop = new GameLoop();
  //   const addedEntity = gameLoop.addEntity();

  //   expectTypeOf(addedEntity).toEqualTypeOf<Entity>();
  // });
});


describe('getEntitiesByComponents', () => {
  it('returns entity with specific component', () => {
    const gameLoop: GameLoop = new GameLoop();
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [1, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()]
      ])],
      [2, new Map<Function, ComponentInterface>()]
    ]);

    const entities: Entity[] = gameLoop.getEntitiesByComponents(new Set<Function>([DummyComponent]));

    expect(entities.length).toBe(1);
    expect(entities).toEqual([1]);
  })
});

  
describe('removeEntity', () => {
  it('should put entity in entitiesToRemove', () => {
    const gameLoop: GameLoop = new GameLoop();
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [1, new Map<Function, ComponentInterface>()],
      [2, new Map<Function, ComponentInterface>()]
    ]);
    gameLoop['entitiesToRemove'] = [];

    expect(gameLoop['entitiesToRemove'].length).toBe(0);

    gameLoop.removeEntity(1);

    expect(gameLoop['entitiesToRemove'].length).toBe(1);
    expect(gameLoop['entitiesToRemove']).toStrictEqual([1]);
  });

  it("can't remove same entity multiple times", () => {
    const gameLoop: GameLoop = new GameLoop();
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [1, new Map<Function, ComponentInterface>()],
      [2, new Map<Function, ComponentInterface>()]
    ]);

    expect(gameLoop['entitiesToRemove'].length).toBe(0);
    expect(gameLoop['entitiesToRemove']).toStrictEqual([]);

    gameLoop.removeEntity(1);

    expect(gameLoop['entitiesToRemove'].length).toBe(1);
    expect(gameLoop['entitiesToRemove']).toStrictEqual([1]);
    
    gameLoop.removeEntity(1);
    
    expect(gameLoop['entitiesToRemove'].length).toBe(1);
    expect(gameLoop['entitiesToRemove']).toStrictEqual([1]);
  });

  it("can't remove non existant entity", () => {
    const gameLoop: GameLoop = new GameLoop();
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [1, new Map<Function, ComponentInterface>()],
      [2, new Map<Function, ComponentInterface>()]
    ]);

    expect(gameLoop['entitiesToRemove'].length).toBe(0);
    expect(gameLoop['entitiesToRemove']).toStrictEqual([]);

    gameLoop.removeEntity(111);
    
    expect(gameLoop['entitiesToRemove'].length).toBe(0);
    expect(gameLoop['entitiesToRemove']).toStrictEqual([]);
  });
});

describe('addComponentToEntity', () => {
  it('adds component to entity', () => {
    const gameLoop: GameLoop = new GameLoop();
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [1, new Map<Function, ComponentInterface>()],
      [2, new Map<Function, ComponentInterface>()]
    ]);

    expect([...gameLoop['entities'].get(0)]).toStrictEqual([]);
    expect([...gameLoop['entities'].get(1)]).toStrictEqual([]);
    expect([...gameLoop['entities'].get(2)]).toStrictEqual([]);

    const dummyComponent: DummyComponent = new DummyComponent();
    gameLoop.addComponentToEntity(dummyComponent, 1);
 
    expect([...gameLoop['entities'].get(0)]).toStrictEqual([]);
    
    expect([...gameLoop['entities'].get(1)]).toEqual([
      [
        DummyComponent,
        <DummyComponent>{
          value: 'Hello World'
        }
      ]
    ]);
    
    expect([...gameLoop['entities'].get(2)]).toStrictEqual([]);
  });
  
  it('adding already attached component is ignored', () => {
    const gameLoop: GameLoop = new GameLoop();
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [1, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()]
      ])],
      [2, new Map<Function, ComponentInterface>()]
    ]);
    const dummyComponent2: DummyComponent = new DummyComponent();
    dummyComponent2.value = 'Again ?';

    gameLoop.addComponentToEntity(dummyComponent2, 1);
    
    expect([...gameLoop['entities'].get(1)]).toEqual([
      [
        DummyComponent,
        <DummyComponent>{
          value: 'Hello World'
        }
      ]
    ]);
  });
});

describe('getComponentsFromEntity', () => {
  it('returns components attached of an entity', () => {
    const gameLoop: GameLoop = new GameLoop();
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [1, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()]
      ])],
      [2, new Map<Function, ComponentInterface>()]
    ]);

    expect([...gameLoop.getComponentsFromEntity(1)]).toEqual([
      [
        DummyComponent,
        <DummyComponent>{
          value: 'Hello World'
        }
      ]
    ]);
  });
});

describe('getComponentFromEntity', () => {
  it('returns a specific attached component from an entity', () => {
    const gameLoop: GameLoop = new GameLoop();
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [1, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()]
      ])],
      [2, new Map<Function, ComponentInterface>()]
    ]);

    expect(gameLoop.getComponentFromEntity(DummyComponent, 1)).toEqual(
        <DummyComponent>{
          value: 'Hello World'
        }
    );
  });
});

describe('entityHasAllComponents', () => {
  it('returns true if components match', () => {
    const gameLoop: GameLoop = new GameLoop();
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [1, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()]
      ])],
      [2, new Map<Function, ComponentInterface>()]
    ]);

    expect(gameLoop.entityHasAllComponents(1, new Set<Function>([DummyComponent]))).toBeTruthy();
  });
  
  it('returns false if components does not match', () => {
    const gameLoop: GameLoop = new GameLoop();
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [1, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()]
      ])],
      [2, new Map<Function, ComponentInterface>()]
    ]);

    expect(gameLoop.entityHasAllComponents(0, new Set<Function>([DummyComponent]))).toBeFalsy();
  });
  
  it('returns false if entity does not exist', () => {
    const gameLoop: GameLoop = new GameLoop();
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [1, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()]
      ])],
      [2, new Map<Function, ComponentInterface>()]
    ]);

    expect(gameLoop.entityHasAllComponents(3, new Set<Function>([DummyComponent]))).toBeFalsy();
  });
});
  
describe('removeComponentFromEntity', () => {
  it('removes component from entity', () => {
    const gameLoop: GameLoop = new GameLoop();
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [1, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()]
      ])],
      [2, new Map<Function, ComponentInterface>()]
    ]);
 
    expect([...gameLoop['entities'].get(1)]).toEqual([
      [
        DummyComponent,
        <DummyComponent>{
          value: 'Hello World'
        }
      ]
    ]);

    gameLoop.removeComponentFromEntity(DummyComponent, 1);
    expect([...gameLoop['entities'].get(1)]).toStrictEqual([]);
  });
});

describe('addSystem', () => {
  it('adds system to the gameLoop', () => {
    const gameLoop: GameLoop = new GameLoop();
    
    gameLoop['systems'] = new Map<AbstractSystem, Set<Entity>>([
    ]);

    expect(gameLoop['systems'].size).toBe(0);

    gameLoop.addSystem(new DummySystem());

    expect(gameLoop['systems'].size).toBe(1);
    
  });

  it('can not add system twice', () => {
    const gameLoop: GameLoop = new GameLoop();
    
    gameLoop['systems'] = new Map<AbstractSystem, Set<Entity>>([
      [new DummySystem(), new Set<Entity>([])]
    ]);
    
    expect(gameLoop['systems'].size).toBe(1);
    
    gameLoop.addSystem(new DummySystem());
    
    expect(gameLoop['systems'].size).toBe(1);
  });
});

describe('getSystemAndEntities', () => {
  it('returns system and its entities', () => {
    const gameLoop: GameLoop = new GameLoop();
    
    const dummySystem: DummySystem = new DummySystem();
    
    gameLoop['systems'] = new Map<AbstractSystem, Set<Entity>>([
      [dummySystem, new Set<Entity>([0, 1, 2])]
    ]);

    expect(gameLoop.getSystemAndEntities(DummySystem)).toEqual(
      [dummySystem, new Set<Entity>([0, 1, 2])]
    );
  });
});

describe('removeSystem', () => {
  it('delete system from gameLoop', () => {
    const gameLoop: GameLoop = new GameLoop();
    
    const dummySystem: DummySystem = new DummySystem();
    
    gameLoop['systems'] = new Map<AbstractSystem, Set<Entity>>([
      [dummySystem, new Set<Entity>([0, 1, 2])]
    ]);
    
    expect(gameLoop['systems'].size).toBe(1);

    gameLoop.removeSystem(DummySystem);

    expect(gameLoop['systems'].size).toBe(0);
  });

  it('ignores non existent system', () => {
    const gameLoop: GameLoop = new GameLoop();
    
    const dummySystem: DummySystem = new DummySystem();
    
    gameLoop['systems'] = new Map<AbstractSystem, Set<Entity>>([
      [dummySystem, new Set<Entity>([0, 1, 2])]
    ]);
    
    expect(gameLoop['systems'].size).toBe(1);

    gameLoop.removeSystem(DummySystem2);

    expect(gameLoop['systems'].size).toBe(1);
    
  });
});

describe('removesEntityFromSystems', () => {
  it('delete entity from entities map', () => {
    const gameLoop: GameLoop = new GameLoop();
    const entitiesMap = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [1, new Map<Function, ComponentInterface>()],
      [2, new Map<Function, ComponentInterface>()]
    ]);
    gameLoop['entities'] = entitiesMap;

    expect(gameLoop['entities'].size).toBe(3);
    expect(gameLoop['entities']).toEqual(entitiesMap);

    gameLoop['removeEntityFromSystems'](1);

    const expectedGameLoopEntitiesMap = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [2, new Map<Function, ComponentInterface>()]
    ]);

    expect(gameLoop['entities'].size).toBe(2);
    expect(gameLoop['entities']).toEqual(expectedGameLoopEntitiesMap);
  });
  
  it('ignores non existent entity', () => {
    const gameLoop: GameLoop = new GameLoop();
    const entitiesMap = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>()],
      [1, new Map<Function, ComponentInterface>()],
      [2, new Map<Function, ComponentInterface>()]
    ]);
    gameLoop['entities'] = entitiesMap;

    expect(gameLoop['entities'].size).toBe(3);
    expect(gameLoop['entities']).toEqual(entitiesMap);

    gameLoop['removeEntityFromSystems'](3);

    expect(gameLoop['entities'].size).toBe(3);
    expect(gameLoop['entities']).toEqual(entitiesMap);
  });
});

describe('update', () => {
  it('calls removeEntityFromSystem n times', () => {
    const gameLoop: GameLoop = new GameLoop();
    gameLoop['entitiesToRemove'] = [0,1,2];
    const removeEntityFromSystemSpy = vi.spyOn(gameLoop, 'removeEntityFromSystems');

    gameLoop.update();

    expect(removeEntityFromSystemSpy).toHaveBeenCalledTimes(3);
  })
})
