import type { Entity } from "$lib/ECS/entities";
import GameLoop from "$lib/gameLoop/GameLoop";
import { getEnemyEntity, getPlayerEntity } from "$lib/queries/CharacterQueries";
import AbstractOnShift from "../../AbstractOnShift";

export default class OnEnterFightingState extends AbstractOnShift {
    
    public execute(gameLoop: GameLoop): void {
        const playerEntity: Entity = getPlayerEntity(gameLoop);
        const enemyEntity: Entity = getEnemyEntity(gameLoop);

        
    }
  
}
