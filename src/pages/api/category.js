import { createRouter } from "next-connect"
import db from "@/Backend/Db/mongoose";
import AquaCategory from '@/Backend/models/category';

const Router = createRouter()

Router.post(async (req, res) => {
    const body = req.body
    try {
        db.connectDb()
        const category = AquaCategory(body)
        await category.save()
        res.status(200).json(category)
        db.disconnectDb()
    } catch (error) {
        res.status(400).json(error)
    }
});



Router.get(async (req, res) => {
    const { category } = req.query
    if (category) {
        db.connectDb()
        let individual = await AquaCategory.findById(category)
        res.status(200).json(individual)
        db.disconnectDb()
    } else if (!category) {
        db.connectDb()
        let invoices = await AquaCategory.find()
        res.status(200).json(invoices)
        db.disconnectDb()
    }
})

Router.delete(async (req, res) => {
    const { invoice } = req.query
    if (invoice) {
        db.connectDb()
        let individualInvoice = await AquaInvoices.deleteOne(invoice)
        res.status(200).json(individualInvoice)
        db.disconnectDb()
    } else if (!invoice) {
        res.status(400).json({ success: false })

    }
})




export default Router.handler()

