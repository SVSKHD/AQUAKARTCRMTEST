import { createRouter } from "next-connect";
import fileUpload from "express-fileupload";
import { imgMiddleware } from "@/middleware/imgMiddleware";
import cloudinary from "@/utils/cloudinary";
import db from "@/Backend/Db/mongoose";
import AquaBlog from "@/Backend/models/blog";

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

Router.post(async (req, res) => {
  try {
    await db.connectDb();

    let titleImages = [];
    let photos = [];

    // Handle titleImage
    if (req.files.titleImages) {
      const titleImageFiles = Array.isArray(req.files.titleImages) ? req.files.titleImages : [req.files.titleImages];
      for (const file of titleImageFiles) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "Blogs/TitleImages",
        });
  
        titleImages.push({
          id: result.public_id,
          secure_url: result.secure_url,
        });
      }
    }

    console.log("images", titleImages)

    // Handle photos
    if (req.files.photos) {
      const photosFiles = Array.isArray(req.files.photos) ? req.files.photos : [req.files.photos];
      for (const file of photosFiles) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "Blogs/Photos",
        });

        photos.push({
          id: result.public_id,
          secure_url: result.secure_url,
        });
      }
    }

    // Attach uploaded images and photos to the request body
    req.body.titleImages = titleImages;
    req.body.photos = photos;

    // Create a new blog entry
    const Blog = await AquaBlog.create(req.body);
    res.status(201).json({ message: "Blog created successfully", data: Blog });
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  } finally {
    db.disconnectDb(); // Ensuring we always disconnect
  }
});

// Update category
Router.put(async (req, res) => {
  try {
    // Extract the category ID from the request parameters
    const { id } = req.query;

    // Connect to the database
    await db.connectDb();

    // Find the category by its reference and update it
    const updatedCategory = await AquaBlog.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }, // Return the updated document
    );

    // Check if the category was found and updated
    if (!updatedCategory) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Handle multiple file uploads to Cloudinary if needed
    if (req.files) {
      const files = Object.values(req.files).flat();
      const photos = [];

      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "products",
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
      message: "Product updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default Router.handler();
