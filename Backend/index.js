import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userroutes from './Routes/user.route.js';
import messageroute from './Routes/message.route.js'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use('/api', userroutes);
app.use('/api',messageroute);

const port = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('✅ Connected to MongoDB');

  app.listen(port, () => {
    console.log(`🚀 Server listening at http://localhost:${port}`);
  });
} catch (error) {
  console.error('❌ MongoDB connection error:', error);
}

app.get('/', (req, res) => {
  res.send('Hello World with ES7 and MongoDB');
});
