import Location from '../Models/Loactionmodel.js';
import generateLocationCode from '../utils/generateLocationCode.js';

export const addLocation = async (req, res) => {
  try {
    const {
        location_name,
    } = req.body;

    const locationCode = await generateLocationCode("LOC"); // Use a prefix if needed

    // Check if required fields are missing
    if (! location_name) {
      return res.status(400).json({ message: "Location Name Required." });
    }

    const newLocation = new Location({
      location_name,
      status: "Active", // Default status to "Active"
      location_code: locationCode
    });

    await newLocation.save();
  
    res.status(201).json({ message: "Location added successfully", location: newLocation });
  } catch (error) {
    console.error("Error adding location:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find()
    res.status(200).json({ locations });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Error fetching locations. Please try again." });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const { location_code } = req.params;
    const {
      location_name,
      status,
    } = req.body;

    const updatedLocation = await Location.findOneAndUpdate(
      { location_code }, // Find by location_code instead of _id
      {
        location_name,
        status,
      },
      { new: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({
      message: "Location updated successfully",
      location: updatedLocation,
    });
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deletedLocation = async (req, res) => {
  try {
    const { location_code } = req.params;

    const deletedLocation = await Location.findOneAndDelete({ location_code });

    if (!deletedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({
      message: "Location deleted successfully",
      location: deletedLocation,
    });
  } catch (error) {
    console.error("Error deleting location:", error);
    res.status(500).json({ message: error.message });
  }
};
