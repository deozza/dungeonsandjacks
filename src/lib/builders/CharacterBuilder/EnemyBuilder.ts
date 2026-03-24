import EnemyFlagComponent from "$lib/ECS/components/EnemyFlagComponent";
import LevelComponent from "$lib/ECS/components/LevelComponent";
import MinimumHandValueComponent from "$lib/ECS/components/MinimumHandValueComponent";
import type { Entity } from "$lib/ECS/entities";
import CharacterBuilder, { type CharacterModel } from "./CharacterBuilder";

type EnemyModel = CharacterModel & {
  LevelComponent: {
    value: number
    },
  MinimumHandValueComponent: {
    value: number
  }
}
export default class EnemyBuilder extends CharacterBuilder {
  
    public static instance: EnemyBuilder | undefined = undefined;

    public getInstance(): EnemyBuilder {
      if(EnemyBuilder.instance === undefined) {
        EnemyBuilder.instance = new EnemyBuilder();
      }

      return EnemyBuilder.instance;
    }
    
    public build(values: EnemyModel): Entity {
      const enemyEntity: Entity = super.build(values);
      this.addEnemyFlagComponent(enemyEntity)
      this.buildLevelComponent(enemyEntity, values);
      this.buildMinimumHandValueComponent(enemyEntity, values);

      return enemyEntity;
    }

    private addEnemyFlagComponent(enemyEntity: Entity): void {
      this.gameLoop?.addComponentToEntity(new EnemyFlagComponent(), enemyEntity);
    }

    private buildLevelComponent(enemyEntity: Entity, values: EnemyModel): void {
      const levelComponent: LevelComponent = new LevelComponent();
      levelComponent.value = values.LevelComponent.value;
      this.gameLoop?.addComponentToEntity(levelComponent, enemyEntity);
    }
    
    private buildMinimumHandValueComponent(enemyEntity: Entity, values: EnemyModel): void {
      const minimumHandValueComponent: MinimumHandValueComponent = new MinimumHandValueComponent();
      minimumHandValueComponent.value = values.MinimumHandValueComponent.value;
      this.gameLoop?.addComponentToEntity(minimumHandValueComponent, enemyEntity);
    }
}
