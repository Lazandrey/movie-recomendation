import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../model/user.js";
import { isValidCreateUser } from "../utils/vlidations.js";
import { authUserId, reAuthUserId } from "../utils/authuserid.js";

const SIGN_IN = async (req, res) => {
  const errors = await isValidCreateUser(req.body);

  if (Object.keys(errors).length > 0) {
    return res
      .status(400)
      .json({ message: "we have some problems", errors: errors });
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newUser = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    password: hash,
  };

  try {
    const user = new userModel(newUser);
    const response = await user.save();

    return res.status(201).json({
      response: "User was created successfully",
      user: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const LOGIN = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "You have provided bad data" });
    }

    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: "You have provided bad data" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "12h" }
    );
    const userToken = authUserId(user.id);
    const userId = reAuthUserId(userToken);
    console.log(user.id);
    console.log(userToken);
    console.log(userId);
    return res.status(200).json({ message: "Successfull login", token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

export { SIGN_IN, LOGIN };
