import express from 'express';
import { getUsers, registerUser} from '../Controllers/userController.js';

const router = express.Router();

// User Registration Route
router.post('/register', registerUser);

// Get All Users
router.get('/', getUsers);


// User Login Route
// router.post('/login', loginUser);

export default router;
