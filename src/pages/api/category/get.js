
import { createRouter } from "next-connect";
import AquaCategory from "@/Backend/models/category";
import db from "@/Backend/Db/mongoose";

const Router = createRouter()
Router.get(async (req, res) => {
    db.connectDb()
    const { id } = req.query
    if (id) {
        const categoryById = await AquaCategory.findById(id)
        res.status(200).json(categoryById)
    } else {
        const allCategories = await AquaCategory.find()
        res.status(200).json(allCategories)
    }

    db.disconnectDb()
})


export default Router.handler()




