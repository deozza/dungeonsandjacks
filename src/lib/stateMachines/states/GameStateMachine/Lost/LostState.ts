import AbstractState from "../../AbstractState/AbstractState";

export default class LostState extends AbstractState {
    public onStateEnter(): void {
        throw new Error("Method not implemented.");
    }
    public onStateExecute(): void {
        throw new Error("Method not implemented.");
    }
    public onStateExit(): void {
        throw new Error("Method not implemented.");
    }
  
}
