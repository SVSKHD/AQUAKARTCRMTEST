import { createRouter } from "next-connect";
import db from "@/Backend/Db/mongoose";
import AquaProduct from "@/Backend/models/product";

const Router = createRouter();
Router.get(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  await db.connectDb();
  const { categoryId, id } = req.query;
  if (id) {
    const productById = await AquaProduct.findById(id);
    res.status(200).json(productById);
  }else if(categoryId){
    const productByCategory = await AquaProduct.find({"category":categoryId})
    res.status(200).json(productByCategory)
  } else {
    const allProducts = await AquaProduct.find();
    res.status(200).json(allProducts);
  }

  db.disconnectDb();
});

export default Router.handler();
