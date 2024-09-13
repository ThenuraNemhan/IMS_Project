import Customer from "../Models/Customermodel.js";
import generateCustomerCode from "../utils/generateCustomerCode.js";

export const addCustomer = async (req, res) => {
  try {
    const {
      customer_name,
      cus_address,
      cus_mobileno,
      cus_email,
      customer_type,
    } = req.body;

    const customerCode = await generateCustomerCode("CUS"); // Use a prefix if needed

    const newCustomer = new Customer({
      customer_name,
      cus_address,
      cus_mobileno,
      cus_email,
      customer_type,
      status: "Active", // Default status to "Active"
      customer_code: customerCode, // Save product code
    });

    await newCustomer.save();

    res.status(201).json({
      message: "Customer added successfully",
      customer: newCustomer,
    });
  } catch (error) {
    console.error("Error adding customer:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({ customers });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res
      .status(500)
      .json({ message: "Error fetching customers. Please try again." });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { customer_code } = req.params;
    const {
      customer_name,
      cus_address,
      cus_mobileno,
      cus_email,
      customer_type,
      status,
    } = req.body;

    const updatedCustomer = await Customer.findOneAndUpdate(
      { customer_code }, // Find by customer_code instead of _id
      {
        customer_name,
        cus_address,
        cus_mobileno,
        cus_email,
        customer_type,
        status,
      },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deletedCustomer = async (req, res) => {
  try {
    const { customer_code } = req.params;

    const deletedCustomer = await Customer.findOneAndDelete({ customer_code });

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer deleted successfully",
      customer: deletedCustomer,
    });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: error.message });
  }
};
