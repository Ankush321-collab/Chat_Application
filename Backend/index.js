import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userroutes from './Routes/user.route.js';
import messageroute from './Routes/message.route.js'
import { app, io, server } from './socket/server.js'
dotenv.config();


app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

app.use('/api', userroutes);
app.use('/api',messageroute);

const port = process.env.PORT

try {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('✅ Connected to MongoDB');

  server.listen(port, () => {
    
    console.log(`🚀 Server listening at http://localhost:${port}`);
  });
} catch (error) {
  console.error('❌ MongoDB connection error:', error);
}

app.get('/', (req, res) => {
  res.send('Hello World with ES7 and MongoDB');
});
