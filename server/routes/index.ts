import { Router } from 'express';
import salesController from '../controllers/salesController.js';

const router: Router = Router();

router.get('/get_sales', salesController.getSales);
router.get('/get_order', salesController.getOrder);

export default router;
