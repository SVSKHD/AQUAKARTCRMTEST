import mongoose from "mongoose";
const AquaSubCategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        images: [{
            publicId: String,  // Public ID of the image in Cloudinary
            url: String,       // URL of the image in Cloudinary
        }],
        keywords: {
            type: String
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: "AquaCategory"
        }
    },
    {
        timestamps: true,
    }
);

const AquaCategory =
    mongoose.models.AquaSubCategory ||
    mongoose.model("AquaSubCategory", AquaSubCategorySchema);

export default AquaCategory;
