import { Router } from 'express';
import { SlotController } from './slot.controller';
import { SlotService } from './slot.service';
import { SlotState } from '../State/states/SlotState';

const slotRouter = Router();
const controller = new SlotController(new SlotService(new SlotState()));

slotRouter.get('/slots', controller.getSlots.bind(controller));
slotRouter.post('/reorder', controller.updateOrder.bind(controller));
slotRouter.patch('/select', controller.toggleSelection.bind(controller));
slotRouter.patch('/clear', controller.clearOrder.bind(controller));

export default slotRouter;
