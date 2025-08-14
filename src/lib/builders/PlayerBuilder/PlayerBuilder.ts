import DeckComponent from "$lib/ECS/components/DeckComponent";
import DescriptionComponent from "$lib/ECS/components/DescriptionComponent";
import DiscardComponent from "$lib/ECS/components/DiscardComponent";
import HandComponent from "$lib/ECS/components/HandComponent";
import HealthComponent from "$lib/ECS/components/HealthComponent";
import NameComponent from "$lib/ECS/components/NameComponent";
import type { Entity } from "$lib/ECS/entities";
import AbstractBuilder from "../AbstractBuilder";

type PlayerModele = {
  
};

export default class PlayerBuilder extends AbstractBuilder {
    public build(values: PlayerModele): Entity {
      if(this.gameLoop === undefined) {
        throw 'gameLoop must be instanciated before using a builder';
      }
      
      const playerEntity: Entity = this.gameLoop.addEntity();
      
      const deckComponent: DeckComponent = new DeckComponent();
      const discardComponent: DiscardComponent = new DiscardComponent();
      const handComponent: HandComponent = new HandComponent();
      const healthComponent: HealthComponent = new HealthComponent();
      const descriptionComponent: DescriptionComponent = new DescriptionComponent();
      const nameComponent: NameComponent = new NameComponent();

      this.gameLoop.addComponentToEntity(deckComponent, playerEntity);
      this.gameLoop.addComponentToEntity(discardComponent, playerEntity);
      this.gameLoop.addComponentToEntity(handComponent, playerEntity);
      this.gameLoop.addComponentToEntity(healthComponent, playerEntity);
      this.gameLoop.addComponentToEntity(descriptionComponent, playerEntity);
      this.gameLoop.addComponentToEntity(nameComponent, playerEntity);

      return playerEntity;
    }
}
