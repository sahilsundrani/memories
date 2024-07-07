import express from 'express';
import { create, searchMemory, deleteMemory, downloadMemory, openMemory, refreshMemory } from '../controllers/memory_controller.js';

const router = express.Router();

router.post('/create', create); 
router.get('/delete/:id',deleteMemory);
router.get('/searchTag',searchMemory);
router.get('/download/:id', downloadMemory);
router.get('/open/:id', openMemory);
router.get('/refreshMemory/:id', refreshMemory);
export default router;