import SendEventToStateMachinesCommand from "$lib/commands/SendEventToStateMachinesCommand";
import type GameLoop from "$lib/gameLoop/GameLoop";
import AbstractOnShift from "../../AbstractOnShift";

export default class OnEnterPlayingState extends AbstractOnShift {
    public execute(gameLoop: GameLoop): void {
      const command = new SendEventToStateMachinesCommand();
      command.execute(gameLoop, null, 'PrepareRoundEvent');
      
    }
  
}
