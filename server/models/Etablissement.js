const { Schema, model } = require("mongoose");

const etablissementSchema = new Schema({
  nom: {
    type: String,
    required: true,
    minlength: 3,
  },
  secteur: {
    type: String,
    enum: ["primaire", "collége", "lycée"],
    required: true,
  },
  responsable: {
    type: Schema.Types.ObjectId,
    ref: "responsable",
    default: null,
  },
  commune: {
    type: Schema.Types.ObjectId,
    ref: "commune",
    default: null,
  },
});

