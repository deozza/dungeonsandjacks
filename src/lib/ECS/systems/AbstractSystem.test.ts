import { describe, expect, it } from "vitest";
import type ComponentInterface from "../components/ComponentInterface";
import type { Entity } from "../entities";
import AbstractSystem from "./AbstractSystem";
import GameLoop from "$lib/gameLoop/GameLoop";

class DummyComponent implements ComponentInterface {
  value: string = "Foo";
}


class DummyComponent2 implements ComponentInterface {
  value: string = "Bar";
}

class DummyComponent3 implements ComponentInterface {
  value: string = "Baz";
}

class EmptySystem extends AbstractSystem {
    public update(entities: Set<Entity>): void {
        
    }
    public requiredComponents: Set<Function> = new Set<Function>([]);
    public excludedComponents: Set<Function> = new Set<Function>([]);
    public listensOnEvents: Set<Function> = new Set<Function>([]);
    constructor() {
        super();
    }

}

class SystemWithEvent extends AbstractSystem {
    public update(entities: Set<Entity>): void {
        
    }
    public requiredComponents: Set<Function> = new Set<Function>([]);
    public excludedComponents: Set<Function> = new Set<Function>([]);
    public listensOnEvents: Set<Function> = new Set<Function>([DummyComponent, DummyComponent2]);
    constructor() {
        super();
    }
}

class SystemWithExcludedComponents extends AbstractSystem {
    public update(entities: Set<Entity>): void {
        
    }
    public requiredComponents: Set<Function> = new Set<Function>([]);
    public excludedComponents: Set<Function> = new Set<Function>([DummyComponent, DummyComponent2]);
    public listensOnEvents: Set<Function> = new Set<Function>([]);
    constructor() {
        super();
    }
}

describe('componentsOfEntityIntersectsWith', () => {
  it('returns false if nothing to compare', () => {
    const gameLoop: GameLoop = new GameLoop();
    const emptySystem: EmptySystem = new EmptySystem();

    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()]
      ])],
    ]);

    emptySystem.gameLoop = gameLoop;

    expect(emptySystem['componentsOfEntityIntersectsWith'](0, new Set<Function>([]))).toBeFalsy();
  });
  
  it('returns false if no component checks out', () => {    
    const gameLoop: GameLoop = new GameLoop();
    const emptySystem: EmptySystem = new EmptySystem();

    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()]
      ])],
    ]);

    emptySystem.gameLoop = gameLoop;

    expect(emptySystem['componentsOfEntityIntersectsWith'](0, new Set<Function>([DummyComponent2, DummyComponent3]))).toBeFalsy();
  });

  it('returns true if at least one component checks out', () => {
    const gameLoop: GameLoop = new GameLoop();
    const emptySystem: EmptySystem = new EmptySystem();

    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()]
      ])],
    ]);

    emptySystem.gameLoop = gameLoop;

    expect(emptySystem['componentsOfEntityIntersectsWith'](0, new Set<Function>([DummyComponent, DummyComponent3]))).toBeTruthy();
  });
  
  it('returns true if at least one component checks out and contains more', () => {
    const gameLoop: GameLoop = new GameLoop();
    const emptySystem: EmptySystem = new EmptySystem();

    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()],
        [DummyComponent2, new DummyComponent2()],
        [DummyComponent3, new DummyComponent3()]
      ])],
    ]);

    emptySystem.gameLoop = gameLoop;

    expect(emptySystem['componentsOfEntityIntersectsWith'](0, new Set<Function>([DummyComponent, DummyComponent3]))).toBeTruthy();
  });
  
});

describe('hasEvents', () => {
  it('returns false if no components to compare', () => {
    const gameLoop: GameLoop = new GameLoop();
    const emptySystem: EmptySystem = new EmptySystem();

    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()]
      ])],
    ]);

    emptySystem.gameLoop = gameLoop;

    expect(emptySystem['hasEvents'](0)).toBeFalsy();
    
  });
  
  it('returns false if no components check out', () => {
    const gameLoop: GameLoop = new GameLoop();
    const emptySystem: SystemWithEvent = new SystemWithEvent();

    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([
        [DummyComponent3, new DummyComponent3()]
      ])],
    ]);

    emptySystem.gameLoop = gameLoop;

    expect(emptySystem['hasEvents'](0)).toBeFalsy();
    
  });
  
  it('returns true if at least one component checks out', () => {
    const gameLoop: GameLoop = new GameLoop();
    const emptySystem: SystemWithEvent = new SystemWithEvent();

    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()]
      ])],
    ]);

    emptySystem.gameLoop = gameLoop;

    expect(emptySystem['hasEvents'](0)).toBeTruthy();
  });
  
  it('returns true if at least one component checks out and contains more', () => {
    const gameLoop: GameLoop = new GameLoop();
    const emptySystem: SystemWithEvent = new SystemWithEvent();

    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()],
        [DummyComponent3, new DummyComponent3()]
      ])],
    ]);

    emptySystem.gameLoop = gameLoop;

    expect(emptySystem['hasEvents'](0)).toBeTruthy();
  });
});

describe('shouldIgnoreEntity', () => {
  it('returns false if no components to compare', () => {
    const gameLoop: GameLoop = new GameLoop();
    const emptySystem: EmptySystem = new EmptySystem();

    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()]
      ])],
    ]);

    emptySystem.gameLoop = gameLoop;

    expect(emptySystem.shouldIgnoreEntity(0)).toBeFalsy();
    
  });
  
  it('returns false if no components check out', () => {
    const gameLoop: GameLoop = new GameLoop();
    const emptySystem: SystemWithExcludedComponents = new SystemWithExcludedComponents();

    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([
        [DummyComponent3, new DummyComponent3()]
      ])],
    ]);

    emptySystem.gameLoop = gameLoop;

    expect(emptySystem.shouldIgnoreEntity(0)).toBeFalsy();
    
  });
  
  it('returns true if at least one component checks out', () => {
    const gameLoop: GameLoop = new GameLoop();
    const emptySystem: SystemWithExcludedComponents = new SystemWithExcludedComponents();

    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()]
      ])],
    ]);

    emptySystem.gameLoop = gameLoop;

    expect(emptySystem.shouldIgnoreEntity(0)).toBeTruthy();
  });
  
  it('returns true if at least one component checks out and contains more', () => {
    const gameLoop: GameLoop = new GameLoop();
    const emptySystem: SystemWithExcludedComponents = new SystemWithExcludedComponents();

    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([
        [DummyComponent, new DummyComponent()],
        [DummyComponent3, new DummyComponent3()]
      ])],
    ]);

    emptySystem.gameLoop = gameLoop;

    expect(emptySystem.shouldIgnoreEntity(0)).toBeTruthy();
  });
});
