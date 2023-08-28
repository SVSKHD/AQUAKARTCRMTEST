import mongoose from "mongoose";

const AquaInvoiceSchema = new mongoose.Schema(
  {
    invoiceNo: {
      type: String,
    },
    date: {
      type: String,
    },
    customerDetails: {
      name: {
        type: String,
      },
      phone: {
        type: Number,
      },
      email: {
        type: String,
      },
      address: {
        type: String,
      },
    },
    gst: {
      type: Boolean,
    },
    gstDetails: {
      gstName: {
        type: String,
      },
      gstNo: {
        type: String,
      },
      gstPhone: {
        type: Number,
      },
      gstEmail: {
        type: String,
      },
      gstAddress: {
        type: String,
      },
    },
    products: [
      {
        productName: {
          type: String,
        },
        productQuantity: {
          type: Number,
        },
        productPrice: {
          type: Number,
        },
        productSerialNo: {
          type: String,
        },
      },
    ],
    transport: {
      deliveredBy: {
        type: String,
      },
      deliveryDate: {
        type: String,
      },
    },
    paidStatus: {
      type: String,
    },
    paymentType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const AquaInvoices =
  mongoose.models.AquaInvoices ||
  mongoose.model("AquaInvoices", AquaInvoiceSchema);

export default AquaInvoices;
