import { describe, it, expect, vi } from 'vitest';
import HealthSystem from './HealthSystem';
import HealthComponent from '$lib/ECS/components/HealthComponent';
import DamageComponent from '$lib/ECS/components/DamageComponent';
import HealComponent from '$lib/ECS/components/HealComponent';
import GameLoop from '$lib/gameLoop/GameLoop';
import type { Entity } from '$lib/ECS/entities';
import type ComponentInterface from '$lib/ECS/components/ComponentInterface';

describe('reduceHealth', () => {
  it('substracts health', () => {
    const healthSystem: HealthSystem = new HealthSystem();
    
    const healthComponent: HealthComponent = new HealthComponent();
    healthComponent.currentHealth = 10;
    healthComponent.maxHealth = 10;

    const damageComponent: DamageComponent = new DamageComponent();
    damageComponent.value = 2;

    const expectedCurrentHealth: number = 8;

    expect(healthSystem['reduceHealth'](damageComponent, healthComponent)).toBe(expectedCurrentHealth);
    
  });
  
  it('can not go down below 0', () => {
    const healthSystem: HealthSystem = new HealthSystem();
    
    const healthComponent: HealthComponent = new HealthComponent();
    healthComponent.currentHealth = 10;
    healthComponent.maxHealth = 10;

    const damageComponent: DamageComponent = new DamageComponent();
    damageComponent.value = 12;

    const expectedCurrentHealth: number = 0;

    expect(healthSystem['reduceHealth'](damageComponent, healthComponent)).toBe(expectedCurrentHealth);
    
  });
});

describe('addHealth', () => {
  it('adds health', () => {
    const healthSystem: HealthSystem = new HealthSystem();
    
    const healthComponent: HealthComponent = new HealthComponent();
    healthComponent.currentHealth = 6;
    healthComponent.maxHealth = 10;

    const healComponent: HealComponent = new HealComponent();
    healComponent.value = 2;

    const expectedCurrentHealth: number = 8;

    expect(healthSystem['addHealth'](healComponent, healthComponent)).toBe(expectedCurrentHealth);
    
  });
  
  it('can not go further than max health', () => {
    const healthSystem: HealthSystem = new HealthSystem();
    
    const healthComponent: HealthComponent = new HealthComponent();
    healthComponent.currentHealth = 6;
    healthComponent.maxHealth = 10;

    const healComponent: HealComponent = new HealComponent();
    healComponent.value = 10;

    const expectedCurrentHealth: number = 10;

    expect(healthSystem['addHealth'](healComponent, healthComponent)).toBe(expectedCurrentHealth);
  });
  
});

describe('executeHealthVariation', () => {
  it('returns if no component is found', () => {
    const gameLoop: GameLoop = new GameLoop();
    
    const healthComponent: HealthComponent = new HealthComponent();
    healthComponent.currentHealth = 10;
    healthComponent.maxHealth = 10;

    
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([
        [HealthComponent, healthComponent],
      ])],
    ]);

    const healthSystem: HealthSystem = new HealthSystem();

    gameLoop.addSystem(healthSystem);

    const reduceHealthSpy = vi.spyOn(healthSystem, 'reduceHealth');
    const addHealthSpy = vi.spyOn(healthSystem, 'addHealth');
    healthSystem['executeHealthVariation'](0);

    expect(reduceHealthSpy).toHaveBeenCalledTimes(0);
    expect(addHealthSpy).toHaveBeenCalledTimes(0);
  });
  it('calls reduceHealth if DamageComponent is found', () => {
    const gameLoop: GameLoop = new GameLoop();
    
    const healthComponent: HealthComponent = new HealthComponent();
    healthComponent.currentHealth = 10;
    healthComponent.maxHealth = 10;

    const damageComponent: DamageComponent = new DamageComponent();
    damageComponent.value = 2;
    
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([
        [HealthComponent, healthComponent],
        [DamageComponent, damageComponent]
      ])],
    ]);

    const healthSystem: HealthSystem = new HealthSystem();

    gameLoop.addSystem(healthSystem);

    const reduceHealthSpy = vi.spyOn(healthSystem, 'reduceHealth');
    const addHealthSpy = vi.spyOn(healthSystem, 'addHealth');
    healthSystem['executeHealthVariation'](0);

    expect(reduceHealthSpy).toHaveBeenCalledTimes(1);
    expect(addHealthSpy).toHaveBeenCalledTimes(0);
  });
  
  it('calls addHealth if HealComponent is found', () => {
    const gameLoop: GameLoop = new GameLoop();
    
    const healthComponent: HealthComponent = new HealthComponent();
    healthComponent.currentHealth = 10;
    healthComponent.maxHealth = 10;

    const healComponent: HealComponent = new HealComponent();
    healComponent.value = 2;
    
    gameLoop['entities'] = new Map<Entity, Map<Function, ComponentInterface>>([
      [0, new Map<Function, ComponentInterface>([
        [HealthComponent, healthComponent],
        [HealComponent, healComponent]
      ])],
    ]);

    const healthSystem: HealthSystem = new HealthSystem();

    gameLoop.addSystem(healthSystem);

    const reduceHealthSpy = vi.spyOn(healthSystem, 'reduceHealth');
    const addHealthSpy = vi.spyOn(healthSystem, 'addHealth');
    healthSystem['executeHealthVariation'](0);

    expect(reduceHealthSpy).toHaveBeenCalledTimes(0);
    expect(addHealthSpy).toHaveBeenCalledTimes(1);
  });  
});
