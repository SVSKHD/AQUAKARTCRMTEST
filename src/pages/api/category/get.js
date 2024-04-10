import { createRouter } from "next-connect";
import AquaCategory from "@/Backend/models/category";
import db from "@/Backend/Db/mongoose";

const Router = createRouter();

Router.get(async (req, res) => {
  // Allowed origins
  const allowedOrigins = ['https://www.aquakart.co.in', 'http://localhost:3000'];
  const origin = req.headers.origin;

  // If the request's origin is in our list of allowed origins, set the header.
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  await db.connectDb(); // Assuming this is an async operation

  const { id, title } = req.query;

  try {
    if (id) {
      const categoryById = await AquaCategory.findById(id);
      res.status(200).json(categoryById);
    } else if (title) {
      const categoryByTitle = await AquaCategory.findOne({ title: title });
      res.status(200).json(categoryByTitle);
    } else {
      const allCategories = await AquaCategory.find();
      res.status(200).json(allCategories);
    }
  } catch (error) {
    // Handle possible errors
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await db.disconnectDb(); // Assuming this is an async operation
  }
});

export default Router.handler();
