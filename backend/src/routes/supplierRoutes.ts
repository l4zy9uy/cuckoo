import { Router } from 'express';
import { createSupplier, getSuppliers, getSupplierById, updateSupplier, deleteSupplier } from '../controllers/supplierController';

const router = Router();

router.post('/suppliers', createSupplier);
router.get('/suppliers', getSuppliers);
router.get('/suppliers/:supplier_id', getSupplierById);
router.put('/suppliers/:supplier_id', updateSupplier);
router.delete('/suppliers/:supplier_id', deleteSupplier);

export default router;