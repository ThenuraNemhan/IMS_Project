import jwt from "jsonwebtoken";
import User from '../Models/Usermodel.js';

// Middleware to authenticate the token
export const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to the request object
    next();
  } catch (error) {
    console.error("Token verification failed:", error); // Add console error for debugging
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};


// Middleware for Company Admin Access
export const companyAdminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'Company Admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied' });
  }
};

const authenticateUser = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('username role');
    
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user; // Add user info to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateUser;
