const { Schema, model } = require("mongoose");
const joi = require("joi");

const CommuneSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
      minlength: 3,
    },
  },
  { versionKey: false,timestamps:true }
);

const Commune = model("commune", CommuneSchema);
const validateCreateCommune = (obj) => {
  const communeSchema = joi.object({
    nom: joi
      .string()
      .trim()
      .min(3)
      .pattern(/^[a-zA-Z][-_é' a-zA-Z()]*$/)
      .required(),
  });
  return communeSchema.validate(obj);
};
module.exports = { Commune ,validateCreateCommune };
