import jwt from "jsonwebtoken";

// Middleware to authenticate the token
export const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded; // Add the user info to the request object
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};

// Middleware for Admin Access
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'Main Admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied' });
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
