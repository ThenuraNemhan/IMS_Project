import Unit from "../Models/Unitsmodel.js";
import generateUnitCode from "../utils/generateUnitCode.js";

export const addUnit = async (req, res) => {
  try {
    const { unit_name } = req.body;

    const unitCode = await generateUnitCode("UNI"); // Use a prefix if needed

    if (!unit_name) {
      return res.status(400).json({ message: "Unit name is required." });
    }

    const newUnit = new Unit({ unit_name, unit_code: unitCode });
    await newUnit.save();

    res.status(201).json({ message: "Unit added successfully", unit: newUnit});
  } catch (error) {
    console.error("Error adding unit:", error);
    res
      .status(500)
      .json({ message: "Error adding unit", error: error.message });
  }
};

export const getUnits = async (req, res) => {
  try {
    const units = await Unit.find(); // Fetch all units
    res.status(200).json({ units });
  } catch (error) {
    console.error("Error fetching units:", error);
    res
      .status(500)
      .json({ message: "Error fetching units. Please try again." });
  }
};
