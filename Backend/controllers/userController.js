import bcrypt from "bcryptjs"; // Si vous utilisez bcryptjs
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//creation de compte
const register = async (req, res) => {
  const { id, name, email, pwd } = req.body;
  try {
    console.log("Données reçues :", req.body);

    const exist = await userModel.getUserByEmail(email);
    console.log("Exist?", exist);

    if (exist) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    console.log("Utilisateur non trouvé, création en cours...");

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(pwd, 10);

    await userModel.createUser(id, name, email, hashedPassword);

    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("req", req.body, "\n email", email, "\n pwd", password);

    let user = await userModel.getUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Email ou mot de passe incorrect." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect." });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("eto ndray");
    res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Erreur serveur:", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export { register, login };
