
import { createRouter } from "next-connect";
import AquaSubCategory from "@/Backend/models/sub-category";
import db from "@/Backend/Db/mongoose";

const Router = createRouter()
Router.get(async (req, res) => {
    db.connectDb()
    const { id } = req.query
    if (id) {
        const categoryById = await AquaSubCategory.findById(id)
        res.status(200).json(categoryById)
    } else {
        const allCategories = await AquaSubCategory.find()
        res.status(200).json(allCategories)
    }

    db.disconnectDb()
})


export default Router.handler()




