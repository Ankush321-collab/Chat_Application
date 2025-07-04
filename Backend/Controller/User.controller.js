import User from '../model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { firstname, email, password, confirmpassword } = req.body;

    if (!firstname || !email || !password || !confirmpassword) {
      return res.status(400).json({
        message: `Missing fields: ${[
          !firstname && "firstname",
          !email && "email",
          !password && "password",
          !confirmpassword && "confirmpassword",
        ].filter(Boolean).join(", ")}`,
        success: false,
      });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Signup successful",
      success: true,
    });

  } catch (error) {
    console.error("Signup failed:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    console.log("[LOGIN] req.body:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password required",
        success: false,
      });
    }

    const user = await User.findOne({ email }).select("firstname email password");

    if (!user) {
      return res.status(400).json({
        message: "user is not valid or not in database",
        success: false
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "invalid password",
        success: false
      });
    }

    const jwt_password = process.env.JWT_USER_PASSWORD;
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      jwt_password,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "Strict"
    });

    const { password: _, ...userResponse } = user.toObject();

    res.status(200).json({
      message: "LOGIN SUCCESSFULLY DONE",
      success: true,
      user: userResponse,
      token,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error during login",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict"
    });
    res.status(201).json({
      message: "logout successfully done",
      success: true
    });
  } catch (error) {
    console.error("logout error:", error);
    res.status(500).json({
      message: "Internal server error during logout",
      success: false,
    });
  }
};

export const alluser = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const users = await User.find({ _id: { $ne: currentUserId } }).select("-password");

    res.status(200).json(users);

  } catch (error) {
    console.log("Error in alluser controller:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
