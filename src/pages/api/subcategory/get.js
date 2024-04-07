import { createRouter } from "next-connect";
import AquaSubCategory from "@/Backend/models/sub-category";
import db from "@/Backend/Db/mongoose";

const Router = createRouter();
Router.get(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://www.aquakart.co.in", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  db.connectDb();
  const { id, title } = req.query;
  if (id) {
    const categoryById = await AquaSubCategory.findById(id);
    res.status(200).json(categoryById);
  } else if (title) {
    const categoryByTitle = await AquaSubCategory.findOne({ title: title });
    res.status(200).json(categoryByTitle);
  } else {
    const allCategories = await AquaSubCategory.find();
    res.status(200).json(allCategories);
  }

  db.disconnectDb();
});

export default Router.handler();
