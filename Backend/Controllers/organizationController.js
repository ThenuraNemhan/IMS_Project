import Organization from '../Models/Organizationmodel.js';
import generateOrganizationCode from '../utils/generateOrganizationCode.js';

export const addOrganization = async (req, res) => {
  try {
    const {
        organization_name,
        organization_BRN,
        owner_name,
    } = req.body;

    const organizationCode = await generateOrganizationCode("ORG"); // Use a prefix if needed

    // Check if required fields are missing
    if (!organization_name || !organization_BRN || !owner_name) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newOrganization = new Organization({
      organization_name,
      organization_BRN,
      owner_name,
      organization_code: organizationCode
    });

    await newOrganization.save();
  
    res.status(201).json({ message: "Organization added successfully", organization: newOrganization });
  } catch (error) {
    console.error("Error adding organization:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find()
    res.status(200).json({ organizations });
  } catch (error) {
    console.error("Error fetching organiztions:", error);
    res.status(500).json({ message: "Error fetching organizations. Please try again." });
  }
};

