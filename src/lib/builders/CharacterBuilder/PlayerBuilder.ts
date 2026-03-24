import PlayerFlagComponent from "$lib/ECS/components/PlayerFlagComponent";
import type { Entity } from "$lib/ECS/entities";
import CharacterBuilder, { type CharacterModel } from "./CharacterBuilder";

export default class PlayerBuilder extends CharacterBuilder {
  
    public static instance: PlayerBuilder | undefined = undefined;

    public getInstance(): PlayerBuilder {
      if(PlayerBuilder.instance === undefined) {
        PlayerBuilder.instance = new PlayerBuilder();
      }

      return PlayerBuilder.instance;
    }

    
    public build(values: CharacterModel): Entity {
      const playerEntity: Entity = super.build(values);
      this.addPlayerFlagComponent(playerEntity)

      return playerEntity;
    }

    private addPlayerFlagComponent(playerEntity: Entity): void {
      this.gameLoop?.addComponentToEntity(new PlayerFlagComponent(), playerEntity);
    }
}
