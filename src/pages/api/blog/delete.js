import { createRouter } from "next-connect";
import cloudinary from "@/utils/cloudinary";
import db from "@/Backend/Db/mongoose";
import AquaBlog from "@/Backend/models/blog";

const Router = createRouter();

Router.get(async (req, res) => {
    try {
      const { id } = req.query;
  
      await db.connectDb();

      if(!id){
        return res.status(404).json({ error: "Please send us the Id" });
      }
  
      const blogToDelete = await AquaBlog.findById(id);
      if (!blogToDelete) {
        return res.status(404).json({ error: "Blog not found" });
      }
  
      // Delete associated images from Cloudinary
      const deleteImagesPromises = blogToDelete.photos.map(photo => {
        return cloudinary.uploader.destroy(photo.id);
      });
      await Promise.all(deleteImagesPromises);
  
      // Remove the blog post from MongoDB
      await AquaBlog.deleteOne({ _id: id });
  
      db.disconnectDb();
  
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });


export default Router.handler()