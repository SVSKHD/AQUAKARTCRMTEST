import { createRouter } from "next-connect";

const Router = createRouter();

Router.post(async (req, res) => {
  const body = req.body;
  console.log(body);
  res.status().json({ data: body });
});

Router.put(async (req, res) => {});

export default Router.handler();
