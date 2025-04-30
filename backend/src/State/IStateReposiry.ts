import { IItemState } from "./IItemState";

export interface IStateRepository<T extends { id: number }> {
    getState() : IItemState<T>;
    updateSelected(item: T, isSelected: boolean) : void;
    updateOrder(from: number, to: number) : void;
    clear() : void;
}
    
    