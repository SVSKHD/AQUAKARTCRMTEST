
import { createRouter } from "next-connect";
import AquaCategory from "@/Backend/models/category";
import db from "@/Backend/Db/mongoose";

const Router = createRouter()
Router.get(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    db.connectDb()
    const { id, title } = req.query
    if (id) {
        const categoryById = await AquaCategory.findById(id)
        res.status(200).json(categoryById)
    } else if (title) {
        const categoryByTitle = await AquaCategory.findOne({ title: title })
        res.status(200).json(categoryByTitle)
    }
    else {
        const allCategories = await AquaCategory.find()
        res.status(200).json(allCategories)
    }

    db.disconnectDb()
})


export default Router.handler()




