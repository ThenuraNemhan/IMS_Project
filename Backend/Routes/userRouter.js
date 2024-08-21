import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/Usermodel.js';

const userRouter = express.Router();

// Login route
userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received username:', username);
  console.log('Received password:', password);

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default userRouter;
