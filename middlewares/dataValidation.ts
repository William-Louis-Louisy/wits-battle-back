import Joi from "joi";

// DATA VALIDATION SCHEMAS FOR USER REGISTRATION
export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required().messages({
    "string.base": `"username" should be a type of 'text'`,
    "string.empty": `"username" cannot be an empty field`,
    "string.min": `"username" should have a minimum length of {#limit}`,
    "string.max": `"username" should have a maximum length of {#limit}`,
    "any.required": `"username" is a required field`,
  }),
  email: Joi.string().email().required().messages({
    "string.base": `"email" should be a type of 'text'`,
    "string.empty": `"email" cannot be an empty field`,
    "string.email": `"email" should be a valid email`,
    "any.required": `"email" is a required field`,
  }),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"))
    .required()
    .messages({
      "string.base": `"password" should be a type of 'text'`,
      "string.empty": `"password" cannot be an empty field`,
      "string.pattern.base": `"password" should have at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long`,
      "any.required": `"password" is a required field`,
    }),
});
