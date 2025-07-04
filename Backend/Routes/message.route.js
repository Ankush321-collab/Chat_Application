import express from 'express'
import secureroute from '../Middleware/SecureRoute.js';
import { sendmessage,getmessage } from '../Controller/message.controller.js';


const router = express.Router();
router.post('/send/:id',secureroute,sendmessage)
router.get('/get/:id',secureroute,getmessage)



export default router;