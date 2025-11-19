import { Router } from 'express';
import { 
  getPacks, 
  getPack, 
  createPack, 
  updatePack, 
  deletePack 
} from '../controllers/packController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

// All routes require admin authentication
router.use(adminAuth);

router.get('/', getPacks);
router.get('/:id', getPack);
router.post('/', createPack);
router.put('/:id', updatePack);
router.delete('/:id', deletePack);

export default router;