import express from 'express';
import Customer from '../Models/Customermodel.js';


const customerRouter = express.Router();

customerRouter.get('/', async (req, res) => {
  try {
    const customers = await Customer.find(); // Fetch all customers from the database
    res.json(customers); // Send the data as JSON
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

export default customerRouter;
