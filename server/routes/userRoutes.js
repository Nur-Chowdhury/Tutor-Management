import express from 'express';
import { findUserById, getAllUsers, search, updateUser } from '../controllers/userControllers.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/findUserById/:id', verifyToken, findUserById);
router.post('/updateUser', verifyToken, updateUser);
router.get('/search', search);
router.get('/allusers', getAllUsers);

export default router;