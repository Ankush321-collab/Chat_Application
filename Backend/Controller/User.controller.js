

import User from '../model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Do NOT read JWT secret at module load time

export const signup = async (req, res) => {
    console.log("signup function")
  try {
    const { firstname, email, password, confirmpassword } = req.body;

    // Validate required fields
    if (!firstname || !email || !password || !confirmpassword) {
      return res.status(400).json({
        message: `Missing fields: ${[
          !firstname && "firstname",
          !email && "email",
          !password && "password",
          !confirmpassword && "confirmpassword",
        ]
          .filter(Boolean)
          .join(", ")}`,
        success: false,
      });
    }

    // Check if passwords match
    if (password !== confirmpassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        success: false,
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
        success: false,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      firstname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT
    // const token = jwt.sign({ id: newUser._id }, 'your_secret_key', {
    //   expiresIn: '1h',
    // });

    return res.status(201).json({
      message: "Signup successful",
      success: true,
    //   token,
    //   user: {
    //     id: newUser._id,
    //     firstname: newUser.firstname,
    //     email: newUser.email,
    //   },
    });

  } catch (error) {
    console.error("Signup failed:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login=async (req,res)=>{
    try {
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

        // compare password
        const isspassword = await bcrypt.compare(password, user.password);
        if (!isspassword) {
            return res.status(400).json({
                message: "invalid password",
                success: false
            });
        }

        // Always get the JWT secret at the time of use
        const jwt_password = process.env.JWT_USER_PASSWORD;
        if (!jwt_password) {
            return res.status(500).json({
                message: "JWT secret is not set on the server.",
                success: false
            });
        }

        // providing token to user
        const token = jwt.sign({ id: user._id, email: user.email }, jwt_password, {
            expiresIn: "1d",
        });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "Strict"
        });

        // Remove password from user object before sending response
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
}

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
}
        

