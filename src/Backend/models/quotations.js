import mongoose from "mongoose";

const AquaQuotationSchema = new mongoose.Schema({
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
  productDetails: {
    photos: [
      {
        id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],
    productName: {
      type: String,
    },
    productPrice: {
      type: Number,
    },
  },
});

const AquaQuotations =
  mongoose.models.AquaQuotations ||
  mongoose.model("AquaQuotations", AquaQuotationSchema);

export default AquaQuotations;
