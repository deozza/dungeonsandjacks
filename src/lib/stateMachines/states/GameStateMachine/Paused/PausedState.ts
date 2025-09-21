import AbstractState from "../../AbstractState/AbstractState";

export default class PausedState extends AbstractState {
    public onStateEnter(): void {
    }
    public onStateExecute(): void {
        throw new Error("Method not implemented.");
    }
    public onStateExit(): void {
    }
  
}
