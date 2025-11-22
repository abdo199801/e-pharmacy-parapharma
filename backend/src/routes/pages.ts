import { Router } from 'express';
import { 
  getPages, 
  getPage, 
  createPage, 
  updatePage, 
  deletePage 
} from '../controllers/pageController';
import { auth } from '../middleware/auth';

const router = Router();

router.use(auth);

router.get('/', getPages);
router.get('/:id', getPage);
router.post('/', createPage);
router.put('/:id', updatePage);
router.delete('/:id', deletePage);

export default router;