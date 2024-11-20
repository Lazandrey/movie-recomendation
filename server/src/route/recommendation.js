import express from "express";
import auth from "../middleware/auth.js";

import {
  GET_ALL_RECOMMENDATIONS,
  GET_RECOMENDATION_BY_ID,
  DELETE_ALL_RECOMENDATION,
  INSERT_RECOMENDATION,
  UPDATE_RECOMENDATION_BY_ID,
  DELETE_RECOMENSATION_BY_ID,
} from "../controller/recommendation.js";

const router = express.Router();

router.get("/recommendations", auth, GET_ALL_RECOMMENDATIONS);

router.get("/recommendations/:id", auth, GET_RECOMENDATION_BY_ID);

router.delete("/recommendations", auth, DELETE_ALL_RECOMENDATION);
router.delete("/recommendations/:id", auth, DELETE_RECOMENSATION_BY_ID);

router.post("/recommendations", auth, INSERT_RECOMENDATION);
router.put("/recommendations/:id", auth, UPDATE_RECOMENDATION_BY_ID);

export default router;
