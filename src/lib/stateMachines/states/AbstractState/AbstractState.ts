export default abstract class AbstractState {
  public abstract onStateEnter(): void;
  public abstract onStateExecute(): void;
  public abstract onStateExit(): void;
}
