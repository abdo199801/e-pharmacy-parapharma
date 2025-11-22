import { Router } from 'express';
import { 
  getDashboardStats, 
  getDashboardCharts, 
  getSystemHealth 
} from '../controllers/dashboardController';
import { auth } from '../middleware/auth';

const router = Router();

// All dashboard routes require authentication
router.use(auth);

router.get('/stats', getDashboardStats);
router.get('/charts', getDashboardCharts);
router.get('/health', getSystemHealth);

export default router;