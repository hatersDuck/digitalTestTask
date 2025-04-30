import { Slot } from '../model/slot';
import { IItemState } from '../State/IItemState';
import { StateRepository } from '../State/state.repository';
import { SlotDto } from './dto/slot.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { SlotGenerator } from './slot.generator';

const COUNT_ROWS = 10 ** 6;

export class SlotService {
    private stateRepository: StateRepository<Slot>;
    private allSlots: Slot[];

    constructor(initState: IItemState<Slot>) {
        this.stateRepository = new StateRepository(initState);
        this.allSlots = SlotGenerator.generate(COUNT_ROWS);
    }

    getSlots(
        page: number,
        limit: number,
        search?: string,
    ): { slots: Slot[]; total: number } {
        const filtered = this.filterSlots(this.allSlots, search);
        const ordered = this.applyCustomOrder([...filtered]);
        const paginated = this.paginate(ordered, page, limit);

        return {
            slots: this.markSelected(paginated),
            total: ordered.length,
        };
    }
    // Тут нужен кеш поиска, т.к. поиск сейчас работает по всему массиву.
    private filterSlots(slots: Slot[], search?: string): Slot[] {
        if (!search) return slots;
        const searchLower = search.toLowerCase();
        return slots.filter((s) =>
            s.title?.toLowerCase().includes(searchLower),
        );
    }
    // Конечно тут можно сделать оптимизацию не сохраняя просто шаги, а именно, что ещё на этапе добавление stepsOrder сделать поверки, но даже тут времени не сильно много уходит, если конечно представить 1000000 перестановок, то да это костыль, но обычный пользователь столько не выдаст
    private applyCustomOrder(slots: Slot[]): Slot[] {
        for (let [start, end] of this.stateRepository.getState().stepsOrder) {
            if (start > end) {
                const i = end - 1;
                const j = start - 1;

                if (i < slots.length && i <= j) {
                    const temp = slots[j];

                    for (let k = j; i < k; k--) {
                        slots[k] = slots[k - 1];
                    }

                    slots[i] = temp;
                }
            } else {
                const i = start - 1;
                const j = end - 1;

                if (j < slots.length && i <= j) {
                    const temp = slots[i];

                    for (let k = i; k < j; k++) {
                        slots[k] = slots[k + 1];
                    }

                    slots[j] = temp;
                }
            }
        }
        return slots;
    }

    private paginate(slots: Slot[], page: number, limit: number): Slot[] {
        const start = (page - 1) * limit;
        return slots.slice(start, start + limit);
    }

    private markSelected(slots: Slot[]): SlotDto[] {
        const selected = this.stateRepository.getState().selected;
        const selectedIds = new Set(Array.from(selected).map((s) => s.id));
        return slots.map((slot) => ({
            ...slot,
            isSelected: selectedIds.has(slot.id),
        }));
    }

    toggleSelection(slot: SlotDto): void {
        this.stateRepository.updateSelected(slot, slot.isSelected);
    }

    updateOrder(order: UpdateOrderDto): void {
        this.stateRepository.updateOrder(
            order.fromId,
            order.toId,
        );
    }

    clearOrder() : void {
        this.stateRepository.clear();
    }
}
