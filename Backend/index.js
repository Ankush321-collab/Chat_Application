import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userroutes from './Routes/user.route.js';
import messageroute from './Routes/message.route.js'
import { app, io, server } from './socket/server.js'
import helmet from 'helmet';
import path from 'path';
dotenv.config();


app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(helmet());

app.use('/api', userroutes);
app.use('/api',messageroute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
  });
}

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
