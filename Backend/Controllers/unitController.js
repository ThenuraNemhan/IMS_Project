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

export const updateUnit = async (req, res) => {
  try {
    const { unit_code } = req.params;
    const {
      unit_name,
    } = req.body;

    const updatedUnit = await Unit.findOneAndUpdate(
      { unit_code }, // Find by unit_code instead of _id
      {
        unit_name,
      },
      { new: true }
    );

    if (!updatedUnit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    res.status(200).json({
      message: "Unit updated successfully",
      unit: updatedUnit,
    });
  } catch (error) {
    console.error("Error updating unit:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deletedUnit = async (req, res) => {
  try {
    const { unit_code } = req.params;

    const deletedUnit = await Unit.findOneAndDelete({ unit_code });

    if (!deletedUnit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    res.status(200).json({
      message: "Unit deleted successfully",
      unit: deletedUnit,
    });
  } catch (error) {
    console.error("Error deleting unit:", error);
    res.status(500).json({ message: error.message });
  }
};
