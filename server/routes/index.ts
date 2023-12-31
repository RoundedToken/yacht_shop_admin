import { Router } from 'express';
import salesController from '../controllers/salesController';

const router: Router = Router();

router.get('/get_sales', salesController.getSales);
router.get('/get_order', salesController.getOrder);
router.get('/get_products', salesController.getProducts);

export default router;
