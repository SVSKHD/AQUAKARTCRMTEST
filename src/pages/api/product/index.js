import { createRouter } from "next-connect";
import bodyParser from "body-parser"
import fileUpload from "express-fileupload";
import { imgMiddleware } from "@/middleware/imgMiddleware";
import cloudinary from "@/utils/cloudinary";
import db from "@/Backend/Db/mongoose";
import AquaProduct from "@/Backend/models/product";


const Router = createRouter()

Router.use(
  fileUpload({
    useTempFiles: true
  })
)
  .use(imgMiddleware)

export const config = {
  api: {
    bodyParser: false
  }
}

Router.post(async (req, res) => {
  try {
    db.connectDb();

    let files = Object.values(req.files).flat();
    let photos = [];

    // Handle multiple file uploads to Cloudinary
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "products"
      });
      photos.push({
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }

    req.body.photos = photos;
    const Product = await AquaProduct.create(req.body);
    res.status(201).json({ message: "Product created successfully", data: Product });

  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  } finally {
    db.disconnectDb(); // Ensuring we always disconnect
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
      const updatedCategory = await AquaProduct.findOneAndUpdate(
          { _id: id },
          req.body,
          { new: true } // Return the updated document
      );

      // Check if the category was found and updated
      if (!updatedProduct) {
          return res.status(404).json({ error: "Product not found" });
      }

      // Handle multiple file uploads to Cloudinary if needed
      if (req.files) {
          const files = Object.values(req.files).flat();
          const photos = [];

          for (const file of files) {
              const result = await cloudinary.uploader.upload(file.tempFilePath, {
                  folder: "products"
              });
              photos.push({
                  id: result.public_id,
                  secure_url: result.secure_url,
              });
          }

          // Update the photos property in the updated category
          updatedProduct.photos = photos;
          await updatedProduct.save();
      }

      // Disconnect from the database
      db.disconnectDb();

      res.status(200).json({
          message: "Product Updated successfully",
          data: updatedProduct,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
  }
});




export default Router.handler()

