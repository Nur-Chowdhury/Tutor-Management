import express from 'express';
import { signin, signout, signup } from '../controllers/authControllers.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', signout);
 
export default router;