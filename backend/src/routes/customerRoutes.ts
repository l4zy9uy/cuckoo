import { Router } from 'express';
import { createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer, searchCustomers } from '../controllers/customerController';

const router = Router();

router.post('/customers', createCustomer);
router.get('/customers', getCustomers);
router.get('/customers/search', searchCustomers); // Route mới cho tìm kiếm
router.get('/customers/:id', getCustomerById);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);

export default router;
