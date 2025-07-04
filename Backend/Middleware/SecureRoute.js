import jwt from 'jsonwebtoken';
import user from '../model/user.model.js';

const secureroute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        error: "No token, authorization denied"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        error: "Invalid token"
      });
    }

    const users = await user.findById(decoded.userId).select("-password");
    if (!users) {
      return res.status(401).json({
        error: "No user found in database"
      });
    }

    req.user = users;
    next();
  } catch (error) {
    console.log("Error in secureroute middleware:", error);
    return res.status(500).json({
      error: "Server error in authentication middleware"
    });
  }
};

export default secureroute;
