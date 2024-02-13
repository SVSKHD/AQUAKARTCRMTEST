import { createRouter } from "next-connect";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import AquaCategory from "@/Backend/models/category";
import { imgMiddleware } from "@/middleware/imgMiddleware";
import cloudinary from "@/utils/cloudinary";
import db from "@/Backend/Db/mongoose";

const Router = createRouter();

Router.use(
  fileUpload({
    useTempFiles: true,
  }),
).use(imgMiddleware);

export const config = {
  api: {
    bodyParser: false,
  },
};

// create category
Router.post(async (req, res) => {
  try {
    await db.connectDb();
    let files = Object.values(req.files).flat();
    let photos = [];

    // Handle multiple file uploads to Cloudinary
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "categories",
      });
      photos.push({
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }

    // Create a new item and save it to MongoDB
    req.body.photos = photos;
    const Category = await AquaCategory.create(req.body);

    res
      .status(201)
      .json({ message: "Item created successfully", data: Category });
    db.disconnectDb();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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
    const updatedCategory = await AquaCategory.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }, // Return the updated document
    );

    // Check if the category was found and updated
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Handle multiple file uploads to Cloudinary if needed
    if (req.files) {
      const files = Object.values(req.files).flat();
      const photos = [];

      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "categories",
        });
        photos.push({
          id: result.public_id,
          secure_url: result.secure_url,
        });
      }

      // Update the photos property in the updated category
      updatedCategory.photos = photos;
      await updatedCategory.save();
    }

    // Disconnect from the database
    db.disconnectDb();

    res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default Router.handler();
