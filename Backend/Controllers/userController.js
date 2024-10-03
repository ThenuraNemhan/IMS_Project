import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/Usermodel.js";
import generateUserCode from "../utils/generateUserCode.js";

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" } // Token expires in 30 days
  );
};

// User Registration Controller
export const registerUser = async (req, res) => {
  const { username, user_email, password, role } = req.body;

  // Validate the request data
  if (!username || !user_email || !password) {
    return res.status(400).json({
      success: false,
      message: "Username, email, and password are required.",
    });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ user_email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already in use.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user_code = await generateUserCode("USR"); // Generate the user code

    const user = new User({
      user_code, // Use the generated user_code
      username,
      user_email,
      password: hashedPassword,
      role,
      status: "Active", // Default status to "Active"
    });

    await user.save();

    // Generate Token after registration
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      data: {
        user_code: user.user_code,
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//Get Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users. Please try again." });
  }
};