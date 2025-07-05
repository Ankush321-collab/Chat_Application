import express from 'express'
import secureroute from '../Middleware/SecureRoute.js';
import { sendmessage,getmessage } from '../Controller/message.controller.js';


const router = express.Router();
router.post('/message/send/:id',secureroute,sendmessage)
router.get('/message/get/:id',secureroute,getmessage)



export default router;