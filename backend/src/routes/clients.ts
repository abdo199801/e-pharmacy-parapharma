import { Router } from 'express';
import { 
  getClients, 
  getClient, 
  createClient, 
  updateClient, 
  deleteClient,
  updateClientStatus
} from '../controllers/adminClientController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

// All routes require admin authentication
router.use(adminAuth);

router.get('/', getClients);
router.get('/:id', getClient);
router.post('/', createClient);
router.put('/:id', updateClient);
router.patch('/:id/status', updateClientStatus);
router.delete('/:id', deleteClient);

export default router;