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
import { auth } from '../middleware/auth';

const router = Router();

router.use(auth);

router.get('/', getPharmacies);
router.get('/stats', getPharmacyStats);
router.get('/:id', getPharmacy);
router.get('/client/:clientId', getPharmacyByClient);
router.post('/', createPharmacy);
router.put('/:id', updatePharmacy);
router.delete('/:id', deletePharmacy);

export default router;