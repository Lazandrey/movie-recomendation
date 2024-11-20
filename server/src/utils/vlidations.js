import userModel from "../model/user.js";
const isEmailExists = async (email) => {
  const response = await userModel.findOne({ email: email });
  return response === null ? false : true;
};

export const isValidCreateUser = async (user) => {
  const resposnse = {};
  if (!user.name) {
    resposnse.name = "Name is required";
  }
  if (!user.email) {
    resposnse.email = "Email is required";
  }
  if (!user.password) {
    resposnse.password = "Password is required";
  }

  if (await isEmailExists(user.email)) {
    resposnse.email = "Email already exists";
  }

  return resposnse;
};
