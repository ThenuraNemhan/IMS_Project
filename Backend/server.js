import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'; // This will load .env file in ES6 modules
import customerRouter from './Routes/customerRouter.js'; // Ensure the casing matches exactly
import userRouter from './Routes/userRouter.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

// Check if URI is undefined
if (!uri) {
  console.error('MongoDB URI is not defined in .env file');
  process.exit(1); // Exit if URI is not defined
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB database connection established successfully"))
.catch(err => console.error("MongoDB connection error:", err));

app.use('/api/customers', customerRouter);
app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
