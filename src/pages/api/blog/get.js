import db from "@/Backend/Db/mongoose";
import AquaBlog from "@/Backend/models/blog";
import { createRouter } from "next-connect";

const Router = createRouter();

Router.get(async (req, res) => {
  try {
    await db.connectDb();
    const blogs = await AquaBlog.find(); // Added await here
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(400).json({ success: false, message: "Problem in blog data", error: error.message });
  } finally {
    db.disconnectDb(); // Ensuring the database is always disconnected
  }
});

export default Router.handler();
