import { createRouter } from "next-connect";
import db from "@/Backend/Db/mongoose";
import AquaProduct from "@/Backend/models/product";
import AquaCategory from "@/Backend/models/category";

const Router = createRouter();

Router.get(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://www.aquakart.co.in");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  await db.connectDb();

  const { categoryId, id } = req.query;

  if (id) {
    const productById = await AquaProduct.findById(id);
    // Find related products by category, excluding the current product by ID
    const relatedProducts = await AquaProduct.find({
      category: productById.category,
      _id: { $ne: id },
    });
    const productWithRelated = {
      ...productById.toObject(), // Convert the Mongoose document to a plain JavaScript object
      relatedProducts,
    };
    res.status(200).json(productWithRelated);
  } else if (categoryId) {
    const productByCategory = await AquaProduct.find({ category: categoryId });
    res.status(200).json(productByCategory);
  } else {
    const allProducts = await AquaProduct.find();
    res.status(200).json(allProducts);
  }

  db.disconnectDb();
});

export default Router.handler();
