import { Router } from 'express';
import { 
  getPharmacies, 
  getPharmacy, 
  getPharmacyByClient,
  createPharmacy, 
  updatePharmacy, 
  deletePharmacy,
  getPharmacyStats
} from '../controllers/pharmacyController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

// All routes require admin authentication
router.use(adminAuth);

router.get('/', getPharmacies);
router.get('/stats', getPharmacyStats);
router.get('/:id', getPharmacy);
router.get('/client/:clientId', getPharmacyByClient);
router.post('/', createPharmacy);
router.put('/:id', updatePharmacy);
router.delete('/:id', deletePharmacy);

export default router;