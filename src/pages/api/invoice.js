import { createRouter } from "next-connect";
import db from "@/Backend/Db/mongoose";
import moment from "moment";
import { nanoid } from "nanoid";
import AquaInvoices from "@/Backend/models/invoice";

const router = createRouter();

const invoiceId = nanoid(5);
const date = moment(new Date()).format("DD/MM/YYYY");

router.post(async (req, res) => {
  try {
    db.connectDb();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    const body = req.body;
    body.invoiceNo = `AQB-${date}-${invoiceId}`;
    body.date = currentDate;
    const invoice = new AquaInvoices(body);
    await invoice.save();
    res.status(200).json(invoice);
    db.disconnectDb();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put(async (req, res) => {
  try {
    const { invoice } = req.query;
    const body = req.body;
    if (invoice) {
      db.connectDb();
      let updated = await AquaInvoices.findByIdAndUpdate(invoice, body);
      res.status(200).json(updated);
      db.disconnectDb();
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get(async (req, res) => {
  const { invoice } = req.query;
  if (invoice) {
    db.connectDb();
    let individualInvoice = await AquaInvoices.findById(invoice);
    res.status(200).json(individualInvoice);
    db.disconnectDb();
  } else if (!invoice) {
    db.connectDb();
    let invoices = await AquaInvoices.find();
    res.status(200).json(invoices);
    db.disconnectDb();
  }
});

router.delete(async (req, res) => {
  const { invoice } = req.query;
  if (invoice) {
    db.connectDb();
    let individualInvoice = await AquaInvoices.findById(invoice);
    res.status(200).json(individualInvoice);
    db.disconnectDb();
  } else if (!invoice) {
    res.status(400).json({ success: false });
  }
});

export default router.handler();
