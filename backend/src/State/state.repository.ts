import { IItemState } from './IItemState';
import { IStateRepository } from './IStateReposiry';

export class StateRepository<T extends { id: number }> implements IStateRepository<T> {
    private state: IItemState<T>;

    constructor(initState: IItemState<T>) {
        this.state = initState;
    }

    getState(): IItemState<T> {
        return this.state;
    }

    updateSelected(item: T, isSelected: boolean): void {
        const existing = Array.from(this.state.selected).find(
            (i) => i.id === item.id,
        );

        if (isSelected && !existing) {
            this.state.selected.add(item);
        } else if (!isSelected && existing) {
            this.state.selected.delete(existing);
        }
    }

    updateOrder(from: number, to: number): void {
        // this.state.stepsOrder.forEach((value, key) => {
        //     if (from <= value && value <= to) {
        //         this.state.stepsOrder.set(key, value - 1);
        //     }
        //     if (from >= value && value >= to)
        //         this.state.stepsOrder.set(key, value + 1);
        // });

        this.state.stepsOrder.push([from, to]);
    }

    clear(): void {
        this.state.stepsOrder = []
    }
}
