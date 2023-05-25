import jwt from "jsonwebtoken";

// CREATE TOKEN
export const maxAge = 3 * 24 * 60 * 60; // 3 days
export const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: maxAge,
  });
};
