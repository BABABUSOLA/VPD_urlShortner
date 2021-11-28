import { Router } from "express";
import {
  createOne,
  getOne,
  getMany,
} from "./shorturl.controller";

const router = Router();

router.post("/", createOne);
router.get("/:shortUrl", getOne);
// router.get("/", getMany);


export default router;
