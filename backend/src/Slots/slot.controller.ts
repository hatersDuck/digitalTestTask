import { Request, Response } from 'express';
import { SlotService } from './slot.service';
import { SlotDto } from './dto/slot.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

export class SlotController {
    constructor(private readonly service: SlotService) {}

    async getSlots(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 20;
            const search = req.query.search as string | undefined;

            const result = this.service.getSlots(page, limit, search);
            res.json(result);
        } catch (error) {
            console.log(`getSlots failed: ${error}`);
            res.status(500).json({ message: 'Error fetching items' });
        }
    }

    async toggleSelection(req: Request, res: Response): Promise<void> {
        try {
            const slot = req.body as SlotDto;
            this.service.toggleSelection(slot);
            res.json(slot);
        } catch (error) {
            console.log(`toggleSelection failed: ${error}`);
            res.status(500).json({ message: 'Error updating selection' });
        }
    }

    async updateOrder(req: Request, res: Response): Promise<void> {
        try {
            const order = req.body as UpdateOrderDto
            this.service.updateOrder(order);
            res.json(order);
        } catch (error) {
            console.log(`updateOrder failed: ${error}`);
            res.status(500).json({ message: 'Error updating order' });
        }
    }

    async clearOrder(req: Request, res: Response): Promise<void> {
        try {
            this.service.clearOrder();
            res.json("order cleared");
        } catch (error) {
            console.log(`updateOrder failed: ${error}`);
            res.status(500).json({ message: 'Error updating order' });
        }
    }
}
