import { Router } from 'express';
import { 
  getPurchases, 
  getPurchase, 
  createPurchase, 
  updatePurchase, 
  deletePurchase,
  getPurchaseStats
} from '../controllers/purchaseController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

// All routes require admin authentication
router.use(adminAuth);

router.get('/', getPurchases);
router.get('/stats', getPurchaseStats);
router.get('/:id', getPurchase);
router.post('/', createPurchase);
router.put('/:id', updatePurchase);
router.delete('/:id', deletePurchase);

export default router;