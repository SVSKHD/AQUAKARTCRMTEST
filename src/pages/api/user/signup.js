import { createRouter } from "next-connect";
import db from "@/Backend/Db/mongoose";
import AquaUser from "@/Backend/models/user";
import bcrypt from "bcrypt";

const Router = createRouter();

// Apply CORS middleware for all routes in this Router
Router.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:3000", "https://aquakart.co.in"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle OPTIONS method for preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
});

Router.post(async (req, res) => {
  await db.connectDb();
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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
    role: "admin",
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
