import GameLoop from "./gameLoop/GameLoop";
import AbstractScene from "./scenes/AbstractScene";
import MainMenuScreen from "./scenes/MainMenuScreen";
import PauseScreen from "./scenes/PauseScreen";
import PlayScreen from "./scenes/PlayScreen";
import SplashScreen from "./scenes/SplashScreen";
import AbstractStateMachine from "./stateMachines/AbstractStateMachine/AbstractStateMachine";
import GameStateMachine from "./stateMachines/GameStateMachine/GameStateMachine";

export default class World {
  #gameLoop: GameLoop | undefined = undefined;

  public get gameLoop(): GameLoop | undefined {
    return this.#gameLoop;
  }
  
  #stateMachines: Map<Function, AbstractStateMachine> = new Map<Function, AbstractStateMachine>([]);

  public get stateMachines(): Map<Function, AbstractStateMachine>{
    return this.#stateMachines;
  }

  private addStateMachine(stateMachine: AbstractStateMachine): World {
    this.#stateMachines.set(stateMachine.constructor, stateMachine);
    return this;
  }

  #scenes: Set<AbstractScene> = new Set<AbstractScene>([])
  
  #currentScene: AbstractScene | undefined = undefined;

  public get currentScreen() {
    return this.#currentScene;
  }

  private set currentScreen(screen) {
    this.#currentScene = screen;
  }

  public update(): void {
    if(this.#gameLoop === undefined) {
      throw "Game not loaded";
    }

    this.#gameLoop.update();
    this.updateCurrentScene();
  }

  public listensToEvent(event: Function): void {

    this.#stateMachines.forEach((stateMachine) => {
      stateMachine.listensToEvent(event);
    })
  }

  private updateCurrentScene(): void {
    this.#scenes.forEach((scene: AbstractScene) => {

      scene.displayed = scene.constraintsAreRespected();
      
      if(scene.displayed === true && scene !== this.currentScreen) {
        this.currentScreen = scene;
      }
      
    });
  }

  private loadScenes(): void {
    if(this.#scenes.size !== 0) {
      return;
    }

    const splashScreen = new SplashScreen();
    splashScreen.setWorld(this);
    
    const mainMenuScreen = new MainMenuScreen();
    mainMenuScreen.setWorld(this);
    
    const playScreen = new PlayScreen();
    playScreen.setWorld(this);
    
    const pauseScreen = new PauseScreen();
    pauseScreen.setWorld(this);

    this.#scenes.add(splashScreen);
    this.#scenes.add(mainMenuScreen);
    this.#scenes.add(playScreen);
    this.#scenes.add(pauseScreen);
  }

  private loadStateMachines(): void {
    if(this.#stateMachines.size !== 0) {
      return;
    }

    this.addStateMachine(GameStateMachine.instance as GameStateMachine);
  }

  public load(): void {
    this.loadScenes();
    this.loadStateMachines();
    this.#gameLoop = new GameLoop();
  }
}
