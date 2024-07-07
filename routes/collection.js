import express from 'express';
const router = express.Router();

import { createCollection, deleteCollection, openCollection, showGallery } from '../controllers/collection_controller.js';
import { getCollection } from '../controllers/home_controller.js';
router.post('/create', createCollection);
router.get('/open/:id', openCollection);
router.get('/delete/:id', deleteCollection);
router.get('/getCollection', getCollection);
router.get('/gallery/:id', showGallery);
export default router;