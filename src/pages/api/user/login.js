import { createRouter } from "next-connect";
import db from "@/Backend/Db/mongoose";
import AquaUser from "@/Backend/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Make sure to import jwt

const Router = createRouter();

Router.post(async (req, res) => {
  try {
    await db.connectDb(); // Assume this is an async function
    const { email, password } = req.body;
    const existingUser = await AquaUser.findOne({ email }); // Make sure to await the result
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" }); // maintain the camelCase convention
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const payload = {
      id: existingUser._id,
      name: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
    };

    // Sign the token with a secret key (you should replace 'YOUR_SECRET_KEY' with your actual secret key)
    const token = jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET, {
      expiresIn: "1d",
    }); // Use environment variable for secrets

    // Send the token to the client
    res.json({
      success: true,
      message: "Login successful",
      user: payload,
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  } finally {
    await db.disconnectDb(); // Disconnect in a finally block to ensure it happens
  }
});

export default Router.handler();
