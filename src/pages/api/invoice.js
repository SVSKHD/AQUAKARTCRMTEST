import { createRouter } from "next-connect";
import db from "@/Backend/Db/mongoose";
import moment from "moment";
import { nanoid } from "nanoid";
import AquaInvoices from "@/Backend/models/invoice";

const router = createRouter();

const invoiceId = nanoid(5);
const date = moment(new Date()).format("DD/MM/YYYY");

function convertDateFormat(dateString) {
  return moment(dateString, "MM/DD/YYYY").format("DD/MM/YYYY");
}

router.post(async (req, res) => {
  try {
    // Connect to the database
    db.connectDb();

    console.log("req.body", req.body);
    const body = req.body;
    // Convert the date format
    const formattedDate = convertDateFormat(body.transport.deliveryDate);
    body.date = formattedDate;
    const invoiceId = nanoid(5);
    body.invoiceNo = `AQB-${formattedDate}-${invoiceId}`;

    // Create a new invoice document
    const invoice = new AquaInvoices(body);
    await invoice.save();

    // Send the response
    res.status(200).json(invoice);

  } catch (error) {
    console.error("Error in invoice creation:", error);
    res.status(400).json({ message: error.message });
  } finally {
    // Optionally, disconnect the database if you're managing connections per request
    db.disconnectDb();
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
