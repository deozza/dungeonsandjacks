import CurrentStateComponent from "$lib/ECS/components/CurrentStateComponent";
import StateMachineComponent from "$lib/ECS/components/StateMachineComponent";
import StateMachineEventComponent from "$lib/ECS/components/StateMachineEventComponent";
import type { Entity } from "$lib/ECS/entities";
import type GameLoop from "$lib/gameLoop/GameLoop";
import AbstractCommand from "./AbstractCommand";

export default class SendEventToStateMachinesCommand extends AbstractCommand {
    public execute(gameLoop: GameLoop, actor: Entity | null, data: any): void {
        const stateMachineEntities: Entity[] = gameLoop.getEntitiesByComponents(new Set<Function>([StateMachineComponent, CurrentStateComponent]));

        for(let stateMachineEntity of stateMachineEntities) {
          gameLoop.addComponentToEntity(new StateMachineEventComponent(data), stateMachineEntity);
        }
    }
    public undo(gameLoop: GameLoop, actor: Entity | null): void {
        throw new Error("Method not implemented.");
    }
    public redo(gameLoop: GameLoop, actor: Entity | null): void {
        throw new Error("Method not implemented.");
    }
  
}
