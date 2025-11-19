import { Router } from 'express';
import { 
  getSubscriptions,
  getSubscription,
  createSubscription, 
  updateSubscription,
  deleteSubscription,
  getClientSubscriptions,
  getSubscriptionStats
} from '../controllers/subscriptionController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

// All routes require admin authentication
router.use(adminAuth);

router.get('/', getSubscriptions);
router.get('/stats', getSubscriptionStats);
router.get('/:id', getSubscription);
router.get('/client/:clientId', getClientSubscriptions);
router.post('/', createSubscription);
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

export default router;