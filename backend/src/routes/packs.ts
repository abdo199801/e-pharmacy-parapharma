import { Router } from 'express';
import { 
  getPacks, 
  getPack, 
  createPack, 
  updatePack, 
  deletePack 
} from '../controllers/packController';
import { auth } from '../middleware/auth';

const router = Router();

router.use(auth);

router.get('/', getPacks);
router.get('/:id', getPack);
router.post('/', createPack);
router.put('/:id', updatePack);
router.delete('/:id', deletePack);

export default router;