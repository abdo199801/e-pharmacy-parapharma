import { Router } from 'express';
import { 
  getPages, 
  getPage, 
  createPage, 
  updatePage, 
  deletePage 
} from '../controllers/pageController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

// All routes require admin authentication
router.use(adminAuth);

router.get('/', getPages);
router.get('/:id', getPage);
router.post('/', createPage);
router.put('/:id', updatePage);
router.delete('/:id', deletePage);

export default router;