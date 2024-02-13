import { createRouter } from "next-connect";
import db from "@/Backend/Db/mongoose";
import AquaUser from "@/Backend/models/user";
import bcrypt from "bcrypt";

const Router = createRouter();

Router.post(async (req, res) => {
  db.connectDb();
  const { email, password } = req.body;
  const existingUser = await AquaUser.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User with this email already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const usernameParts = email.split("@");
  let username = usernameParts[0];
  const newUser = new AquaUser({
    email,
    password: hashedPassword,
    username: username,
  });

  await newUser.save();
  const flattenObject = {
    email: newUser.email,
    role: newUser.role,
    username: newUser.username,
  };
  res.status(200).json({
    success: true,
    message: "Successfully Signed you up",
    user: flattenObject,
  });
  db.disconnectDb();
});

export default Router.handler();
