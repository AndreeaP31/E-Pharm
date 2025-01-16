import Pharmacy from "../models/Pharmacy.js";

// Obține toate farmaciile

// Obține o farmacie după ID

// Adaugă o farmacie
const addPharmacy = async (req, res) => {
  const { name, address, phoneNumber, email } = req.body;

  try {
    // Validăm câmpurile necesare
    if (!name || !address) {
      return res.status(400).json({ message: "Name and address are required." });
    }

    // Creăm un document pentru farmacie
    const newPharmacy = new Pharmacy({
      name,
      address,
      phoneNumber,
      email,
    });

    // Salvăm documentul în baza de date
    await newPharmacy.save();

    res.status(201).json({
      success: true,
      message: "Pharmacy added successfully.",
      pharmacy: newPharmacy,
    });
  } catch (error) {
    console.error("Error adding pharmacy:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
const getPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    if (!pharmacies || pharmacies.length === 0) {
      return res.status(404).json({ message: "No pharmacies found." });
    }
    res.status(200).json(pharmacies);
  } catch (error) {
    console.error("Error fetching pharmacies:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Obține o farmacie după ID
const getPharmacyById = async (req, res) => {
  const { id } = req.params;
  try {
    const pharmacy = await Pharmacy.findById(id);
    if (!pharmacy) {
      return res.status(404).json({ message: "Pharmacy not found." });
    }
    res.status(200).json(pharmacy);
  } catch (error) {
    console.error("Error fetching pharmacy:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
const getPharmaciesSorted = async (req, res) => {
  const { sortBy } = req.query; // Extragem criteriul de sortare din query (ex. "name")

  try {
    const pharmacies = await Pharmacy.find().sort({ [sortBy]: 1 }); // Sortare ascendentă

    if (!pharmacies || pharmacies.length === 0) {
      return res.status(404).json({ message: "No pharmacies found." });
    }

    res.status(200).json(pharmacies);
  } catch (error) {
    console.error("Error fetching sorted pharmacies:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export { getPharmacies,getPharmacyById, addPharmacy ,getPharmaciesSorted};
