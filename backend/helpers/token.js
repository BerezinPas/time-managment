import jwt from "jsonwebtoken";

const SECRET = "asdzxcx";

export const generate = (data) => {
  return jwt.sign(data, SECRET, { expiresIn: "30d" });
};

export const verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
