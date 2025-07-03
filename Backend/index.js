import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'

import cookieParser from 'cookie-parser';
import userroutes from './Routes/user.route.js'

dotenv.config(); // Load .env variables

const app = express();
//middleware
app.use(express.json());

//middleware for cookies parsing to backend
app.use(cookieParser());

//cookie pasrsing
app.use(cors(
  {
    origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:["GET","POST"],
  allowedHeaders:["Content-Type","Authorization"],
  }
))

//routes for signup
app.use('/api',userroutes)

// Connect to MongoDB
try {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('✅ Connected to MongoDB');
} catch (error) {
  console.error('❌ MongoDB connection error:', error);
}

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World with ES7 and MongoDB (no schema)');
});

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
