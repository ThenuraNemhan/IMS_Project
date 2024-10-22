// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import ProductRouter from './Routes/productRouter.js';
import UnitRouter from './Routes/unitRouter.js';
import ProductCategoryRouter from './Routes/productCategoryRouter.js';
import OrganizationRouter from './Routes/organizationRouter.js';
import CustomerRouter from './Routes/customerRouter.js';
import LocationRouter from './Routes/locationRouter.js';
import UserRouter from './Routes/userRouter.js';
import OrderRouter from './Routes/orderRouter.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://192.168.56.1:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('MongoDB URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB database connection established successfully"))
.catch(err => console.error("MongoDB connection error:", err));

app.use('/api/products', ProductRouter);
app.use('/api/units', UnitRouter);
app.use('/api/categories', ProductCategoryRouter);
app.use('/api/organizations', OrganizationRouter);
app.use('/api/customers', CustomerRouter);
app.use('/api/locations', LocationRouter);
app.use('/api/users', UserRouter);
app.use('/api/orders', OrderRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port: ${port}`);
});
