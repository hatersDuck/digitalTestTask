import { Slot } from '../../model/slot';
import { IItemState } from '../IItemState';

export class SlotState implements IItemState<Slot> {
    selected: Set<Slot>;
    stepsOrder: Array<[number, number]>;

    constructor() {
        this.selected = new Set();
        this.stepsOrder = new Array<[number, number]>();
    }
}
