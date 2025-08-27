import express from 'express'
const router = express.Router();
import { verifyToken } from '../utils/verifyUser.js';
import { approveAd, deleteAd, makeUserAdmin } from '../controllers/adminController.js';


router.put('/:id', verifyToken, makeUserAdmin);
router.delete('/ad/:id', deleteAd);
router.put('/ad/approve/:id', approveAd);

export default router;