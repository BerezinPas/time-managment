import { OPTIONS_START_TIME } from "../constants.js";
import { generate } from "../helpers/index.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";

// register
export const register = async (login, password) => {
  if (!password) {
    throw new Error("Password is empty");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });

  const token = generate({ id: user.id });

  return { user, token };
};

// login

export const login = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Wrong password");
  }

  const token = generate({ id: user.id });

  return { user, token };
};

// logout

export const updateUser = async (userId, userData) => {
  const user = await User.findByIdAndUpdate(userId, userData, {
    returnDocument: "after",
  });
  return user;
};
