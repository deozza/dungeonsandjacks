import EnemyBuilder from "$lib/builders/CharacterBuilder/EnemyBuilder";
import SendEventToStateMachinesCommand from "$lib/commands/SendEventToStateMachinesCommand";
import ShuffleDeckCommand from "$lib/commands/ShuffleDeckCommand";
import { enemies } from "$lib/configs/characters/enemies";
import PlayerFlagComponent from "$lib/ECS/components/PlayerFlagComponent";
import type { Entity } from "$lib/ECS/entities";
import type GameLoop from "$lib/gameLoop/GameLoop";
import AbstractOnShift from "../../AbstractOnShift";

export default class OnEnterLoadingState extends AbstractOnShift {
    
    public execute(gameLoop: GameLoop): void {
        const playerEntity: Entity = gameLoop.getEntitiesByComponents(new Set([PlayerFlagComponent]))[0];
        
        const enemyValues = enemies[Math.floor(Math.random() * enemies.length)]

        const enemyBuilder: EnemyBuilder = new EnemyBuilder();
        enemyBuilder.gameLoop = gameLoop;
        const enemyEntity: Entity = enemyBuilder.build(enemyValues);
        
        const shuffleDeckCommand: ShuffleDeckCommand = new ShuffleDeckCommand();
        shuffleDeckCommand.execute(gameLoop, playerEntity, null);
        shuffleDeckCommand.execute(gameLoop, enemyEntity, null);
        
        const command = new SendEventToStateMachinesCommand();
        command.execute(gameLoop, null, 'PlayEvent');
    }
  
}
