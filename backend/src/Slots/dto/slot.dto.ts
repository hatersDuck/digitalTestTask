import { Slot } from "../../model/slot";

export class SlotDto implements Slot {
    id!: number;
    title?: string;
    isSelected!: boolean;
}
