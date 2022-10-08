import Joi from "joi";
import jwt from "jsonwebtoken";

export const createListSchema = Joi.object().keys({
  image: Joi.string().required(),
  address: Joi.string().lowercase().required(),
  price: Joi.required(),
  numOfBeds: Joi.number().required(),
  numOfBaths: Joi.number().required(),
  rating: Joi.number().required(),
  userId: Joi.number(),
});

export const updateListSchema = Joi.object().keys({
  image: Joi.required(),
  address: Joi.string().lowercase().required(),
  price: Joi.number().required(),
  numOfBeds: Joi.number().required(),
  numOfBaths: Joi.number().required(),
  rating: Joi.number().required(),
  userId: Joi.number().required(),
});
export const createRegisterSchema = Joi.object()
  .keys({
    fullName: Joi.string().lowercase().required(),
    email: Joi.string().trim().lowercase().required(),
    phoneNumber: Joi.string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password: Joi.ref("password"),
  })
  .with("password", "confirm_password");

export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});

//Generate Token
export const generateToken = (user: { [key: string]: unknown }): unknown => {
  const pass = process.env.JWT_SECRET as string;
  return jwt.sign(user, pass, { expiresIn: "7d" });
};

//This is to ensure the error message is properly written
export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
