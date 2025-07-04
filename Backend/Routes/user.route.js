import express from 'express';
import { signup, login, logout, alluser } from '../Controller/User.controller.js';
import secureroute from '../Middleware/SecureRoute.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/alluser', secureroute, alluser);

export default router;
