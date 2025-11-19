// src/admin/routes/test.ts
import { Router } from 'express';
import { testDatabaseConnection } from '../controllers/adminTestController';

const router = Router();
router.get('/db-test', testDatabaseConnection);
export default router;