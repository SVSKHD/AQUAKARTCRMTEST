import { createRouter } from "next-connect";
import cloudinary from "@/utils/cloudinary";
import db from "@/Backend/Db/mongoose";
import AquaSubCategory from "@/Backend/models/sub-category";

const Router = createRouter();

Router.get(async (req, res) => {
  try {
    const { id } = req.query;

    await db.connectDb();

    if (!id) {
      return res.status(404).json({ error: "Please send us the Id" });
    }

    const categoryToDelete = await AquaSubCategory.findById(id);
    if (!categoryToDelete) {
      return res.status(404).json({ error: "SubCategory not found" });
    }

    // Delete associated images from Cloudinary
    const deleteImagesPromises = categoryToDelete.photos.map(photo => {
      const publicId = photo.id; // Use the correct ID directly
      return cloudinary.uploader.destroy(publicId);
    });
    await Promise.all(deleteImagesPromises);

    // Remove the category from MongoDB
    await AquaSubCategory.deleteOne({ _id: id });

    db.disconnectDb();

    res.status(200).json({ message: "Sub-Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default Router.handler();
