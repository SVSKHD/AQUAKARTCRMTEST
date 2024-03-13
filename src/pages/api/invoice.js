import { createRouter } from "next-connect";
import db from "@/Backend/Db/mongoose";
import moment from "moment";
import { nanoid } from "nanoid";
import AquaInvoices from "@/Backend/models/invoice";

const router = createRouter();

function convertDateFormat(dateString) {
  // Check if dateString is valid. If not, use current date
  const date = moment(dateString, "MM/DD/YYYY").isValid()
    ? moment(dateString, "MM/DD/YYYY")
    : moment();

  return date.format("DD/MM/YYYY");
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
  const { gst, po, quotation, monthly, year } = req.query;

  if (invoice) {
    db.connectDb();
    let individualInvoice = await AquaInvoices.findById(invoice);
    res.status(200).json(individualInvoice);
    db.disconnectDb();
  } else if (gst) {
    db.connectDb();
    let gstInvoices = await AquaInvoices.find({ gst: gst })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(gstInvoices);
    db.disconnectDb();
  } else if (po) {
    db.connectDb();
    let poInvoices = await AquaInvoices.find({ po: po })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(poInvoices);
    db.disconnectDb();
  } else if (quotation) {
    db.connectDb();
    let quotationInvoices = await AquaInvoices.find({ quotation: quotation })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(quotationInvoices);
    db.disconnectDb();
  } else if (monthly) {
    // Assuming monthly is in format YYYY-MM
    const yearMonth = monthly.split("-");
    const year = parseInt(yearMonth[0]);
    const month = parseInt(yearMonth[1]);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    db.connectDb();
    let monthlyInvoices = await AquaInvoices.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ createdAt: -1 });
    res.status(200).json(monthlyInvoices);
    db.disconnectDb();
  } else if (year) {
    const startDate = new Date(year, 0, 1); // January 1st of the given year
    const endDate = new Date(year, 11, 31, 23, 59, 59); // December 31st of the given year

    db.connectDb();
    let yearInvoices = await AquaInvoices.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(yearInvoices);
    db.disconnectDb();
  } else {
    db.connectDb();
    let invoices = await AquaInvoices.find({
      gst: false,
      po: false,
      quotation: false,
    })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(invoices);
    db.disconnectDb();
  }
});

router.delete(async (req, res) => {
  const { invoice } = req.query;
  if (invoice) {
    db.connectDb();
    let individualInvoice = await AquaInvoices.findByIdAndDelete(invoice);
    res.status(200).json(individualInvoice);
    db.disconnectDb();
  } else if (!invoice) {
    res.status(400).json({ success: false });
  }
});

export default router.handler();
