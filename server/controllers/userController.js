const {
  User,
  validateCreateUser,
  validateLoginUser,
  validateUpdateUser,
} = require("../models/User");

const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { POWER_HASH, SUCRET_KEY } = require("dotenv").config().parsed;
const create = async (req, res) => {
  if (!req.is_admin) {
    return res
      .status(403)
      .json({ message: "Vous n'avez pas le droit de créer un responsable" });
  }
  try {
    const { error, value } = validateCreateUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).json({ message: "Responsable déjà existant" });
    const hashPass = await bcryptjs.hash(req.body.password, Number(POWER_HASH));
    const newUser = new User({ ...value, password: hashPass });
    await newUser.save();
    res.status(201).json({ message: "Responsable créé avec succès" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { error, value } = validateLoginUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const user = await User.findOne({ email: value.email });
    if (!user)
      return res
        .status(404)
        .json({ message: "Adresse e-mail ou mot de passe invalide !" });
    const valideatePassword = await bcryptjs.compare(
      value.password,
      user.password
    );
    if (!valideatePassword)
      return res
        .status(404)
        .json({ message: "Adresse e-mail ou mot de passe invalide !" });
    const token = jwt.sign(
      { is_admin: user.is_admin, _id: user._id },
      SUCRET_KEY,
      {
        expiresIn: "30d",
      }
    );
    res.status(201).json({
      token,
      message: "Connecté avec succès",
      user: {
        _id: user._id,
        PPR: user.PPR,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        etablissement: user.etablissement,
        is_admin: user.is_admin,
        image: user.image,
        user_name: user.user_name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  if (!req.is_admin) {
    return res
      .status(403)
      .json({ message: "Vous n'avez pas le droit de modifier un responsable" });
  }

  try {
    const { error, value } = validateUpdateUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const user = await User.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    if (!user)
      return res.status(404).json({ message: "Responsable non trouvé." });
    res.status(200).json({
      message: `Responsable ${user.user_name} modifié avec succès.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  if (!req.is_admin) {
    return res
      .status(403)
      .json({ message: "Vous n'avez pas le droit de supprumé un responsable" });
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Responsable non trouvé." });
    }

    return res
      .status(200)
      .json({ message: `Responsable ${user.user_name} supprimé avec succès.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

const getAll = async (req, res) => {
  if (!req.is_admin) {
    return res
      .status(403)
      .json({
        message: "Vous n'avez pas le droit de lister les responsables.",
      });
  }
  try {
    const users = await User.find({ is_admin: false }).select('-password');
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  if (!req.is_admin) {
    return res
      .status(403)
      .json({ message: "Vous n'avez pas le droit de lister un responsable." });
  }
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: "Responsable non trouvé." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { create, login, update, remove, getAll, getById };
