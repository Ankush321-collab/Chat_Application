import express from 'express';
import {signup,login,logout} from '../Controller/User.controller.js'
const router=express.Router();

//signup routes
router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout);



export default router;