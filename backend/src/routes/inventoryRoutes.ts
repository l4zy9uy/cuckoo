// routes/inventoryRoutes.ts
import { Router } from 'express';
import { createInventory, getInventories, getInventoryById, updateInventory, deleteInventory } from '../controllers/inventoryController';

const router = Router();

router.post('/inventories', createInventory);
router.get('/inventories', getInventories);
router.get('/inventories/:inventory_id', getInventoryById);
router.put('/inventories/:inventory_id', updateInventory);
router.delete('/inventories/:inventory_id', deleteInventory);

export default router;