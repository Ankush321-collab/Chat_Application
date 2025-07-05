import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false, // Hides password from queries unless explicitly selected
  },
  
},{
  timestamps:true
});

// Optional: pre-save hook to hash password — but you're doing it in controller

const User = mongoose.model('User', UserSchema);
export default User;
