const { Commune, validateCreateCommune } = require("../models/Commune");

const create = async (req, res) => {
    if (!req.is_admin) {
        return res
          .status(403)
          .json({ message: "Vous n'avez pas le droit de créer un Commune" });
      }
  try {
    const { error, value } = validateCreateCommune(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const newCommune = new Commune(value);
    await newCommune.save();
    res
      .status(201)
      .json({ message: `Commune '${newCommune.nom}' créée avec succès` });
  } catch (error) {
   
    res.status(500).json({ message: error.message });
  }
};

const getAll = async(req,res)=>{
    if (!req.is_admin) {
        return res
          .status(403)
          .json({ message: "Vous n'avez pas le droit de lister les communes." });
      }
    try {
        const communes = await Commune.find().sort({ createdAt: -1 });
        res.status(200).json(communes)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
const getById = async(req,res)=>{
    if (!req.is_admin) {
        return res
          .status(403)
          .json({ message: "Vous n'avez pas le droit de lister une commune." });
      }
    try {
        const commune = await Commune.findById(req.params.id)
        if(!commune) return res.status(404).json({message:"Commune introuvable."})
        res.status(200).json(commune)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
const update = async(req,res)=>{
    if (!req.is_admin) {
        return res
          .status(403)
          .json({ message:"Vous n'avez pas le droit de modifier une commune." });
      }
    try {
        const { error, value } = validateCreateCommune(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
       
        const commune = await Commune.findByIdAndUpdate(req.params.id,value,{new:true})
        if(!commune) return res.status(404).json({message:"Commune introuvable."})
        res.status(200).json({message:`Commune ${commune.nom}  modifier avec succès`})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
const remove = async (req,res)=>{
    if (!req.is_admin) {
        return res
          .status(403)
          .json({ message:"Vous n'avez pas le droit de supprimer une commune." });
      }
      try {
        const commune = await Commune.findByIdAndDelete(req.params.id)
        if(!commune) return res.status(404).json({message:"Commune introuvable."})
        res.status(200).json({message:"Commune supprimer avec succès"})
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
}

module.exports = {create,getAll,getById,update,remove}
