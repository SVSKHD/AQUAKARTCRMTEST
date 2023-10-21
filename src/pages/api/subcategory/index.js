import { createRouter } from "next-connect";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import AquaSubCategory from "@/Backend/models/sub-category";
import { imgMiddleware } from "@/middleware/imgMiddleware";
import cloudinary from "@/utils/cloudinary";
import db from "@/Backend/Db/mongoose";

const Router = createRouter();

Router.use(
  fileUpload({
    useTempFiles: true,
  })
).use(imgMiddleware);

export const config = {
  api: {
    bodyParser: false,
  },
};

// create sub category
Router.post(async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    let files = Object.values(req.files).flat();
    let photos = [];

    // Handle multiple file uploads to Cloudinary
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "subcategories",
      });
      photos.push({
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }

    // Create a new subcategory and save it to MongoDB
    req.body.photos = photos;
    const SubCategory = await AquaSubCategory.create(req.body);

    return res
      .status(201)
      .json({ message: "Subcategory created successfully", data: SubCategory });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  } finally {
    db.disconnectDb();
  }
});

// update category
Router.put(async (req, res) => {
  try {
    // Extract the category ID from the request parameters
    const { id } = req.query;

    // Connect to the database
    db.connectDb();

    // Find the category by its reference and update it
    const updatedSubCategory = await AquaSubCategory.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true } // Return the updated document
    );

    // Check if the category was found and updated
    if (!updatedSubCategory) {
      return res.status(404).json({ error: "Sub Category not found" });
    }

    // Handle multiple file uploads to Cloudinary if needed
    if (req.files) {
      const files = Object.values(req.files).flat();
      const photos = [];

      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "subcategories",
        });
        photos.push({
          id: result.public_id,
          secure_url: result.secure_url,
        });
      }

      // Update the photos property in the updated category
      updatedSUbCategory.photos = photos;
      await updatedSubCategory.save();
    }

    // Disconnect from the database
    db.disconnectDb();

    res.status(200).json({
      message: "Sub Category updated successfully",
      data: updatedSubCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default Router.handler();
