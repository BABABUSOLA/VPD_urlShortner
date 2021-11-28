import express, { json, urlencoded } from "express";
import cors from "cors";
import path from "path";
import config from "./config";
import { connect } from "./utils/db";

import shorturlRouter from "./resources/shortUrl/shorturl.router";

export const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(json({ limit: "25mb" }));
app.use(urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", shorturlRouter);


export const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT || 3000, () => {
      console.log(`API on http://localhost:3000/`);
    });
  } catch (e) {
    console.error(e);
  }
};
