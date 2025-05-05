import { Slot } from "../model/slot";

export class SlotGenerator {
    static generate(count: number): Slot[] {
        return Array.from({ length: count }, (_, i) => this.generateSlot(i + 1));
    }

    private static generateSlot(id: number): Slot {
        return {
            id
        };
    }
}