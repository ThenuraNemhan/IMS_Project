import express from "express";
import {
  getUsers,
  getUser,
  loginUser,
  registerUser,
} from "../Controllers/userController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

// User Registration Route
router.post("/register", registerUser);

// User Login Route
router.post("/login", loginUser);

// Get User
router.get("/production-batch-created-user", authenticateUser, getUser);
router.get("/", getUsers);

export default router;
