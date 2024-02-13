import AquaUser from "@/Backend/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userLogin = async (email, password) => {
  const user = await AquaUser.findOne({ email: email });
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
  return { message: "Logged in successfully.", token };
};

const userLoginEmail = () => {};

const userSignupEmail = () => {};

const userOperations = () => {
  return {
    userLogin,
    userLoginEmail,
    userSignupEmail,
  };
};

export default userOperations;
