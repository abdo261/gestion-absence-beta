const { Schema, model } = require("mongoose");
const joi = require("joi");
const UserSchema = new Schema({
  PPR: {
    type: String,
    unique: true,
    required: true,
  },
  nom: {
    type: String,
    required: true,
    minlength: 3,
  },
  prenom: {
    type: String,
    require: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  etablissement: {
    type: Schema.Types.ObjectId,
    ref: "etablissement",
    default: null,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: null,
  },
},{versionKey:false,timestamps:true});


UserSchema.virtual("user_name").get(function () {
  return `${this.nom}_${this.prenom}`;
});


const User = model("user", UserSchema);

//validate userCreate Schema
const validateCreateUser = (obj) => {
  const userSchema = joi.object({
    PPR: joi.string().trim().required(),
    nom: joi.string().trim().min(3).max(50).required(),
    prenom: joi.string().trim().min(3).max(50).required(),
    email: joi.string().trim().email().min(8).required(),
    password: joi.string().trim().min(8).required(),
    etablissement: joi.string().allow(null).optional(),
    is_admin: joi.boolean().default(false),
    image: joi.string().allow(false).optional(),
  });
  return userSchema.validate(obj);
};
//validate userLogin Schema
const validateLoginUser = (obj) => {
  const userSchema = joi.object({
    email: joi.string().trim().email().min(8).required(),
    password: joi.string().trim().min(8).required(),
  });
  return userSchema.validate(obj);
};

const validateUpdateUser = (obj) => {
    const userSchema = joi.object({
      PPR: joi.string().trim(),
      nom: joi.string().trim().min(3).max(50),
      prenom: joi.string().trim().min(3).max(50),
      email: joi.string().trim().email().min(8),
      etablissement: joi.string().allow(null),
      is_admin: joi.boolean(),
      image: joi.string().allow(null),
    });
  

    const filteredSchema = userSchema.keys(Object.keys(obj));
  
    return filteredSchema.validate(obj);
  };
module.exports = { User, validateCreateUser,validateLoginUser,validateUpdateUser };
