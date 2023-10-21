
import { createRouter } from "next-connect";
import db from "@/Backend/Db/mongoose";
import AquaProduct from "@/Backend/models/product";

const Router = createRouter()
Router.get(async (req, res) => {
    db.connectDb()
    const { id } = req.query
    if (id) {
        const productById = await AquaProduct.findById(id)
        res.status(200).json(productById)
    } else {
        const allProducts = await AquaProduct.find()
        res.status(200).json(allProducts)
    }

    db.disconnectDb()
})


export default Router.handler()




