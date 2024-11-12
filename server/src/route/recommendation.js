import express from "express";

import {
  GET_ALL_RECOMMENDATIONS,
  GET_RECOMENDATION_BY_ID,
  DELETE_ALL_RECOMENDATION,
  INSERT_RECOMENDATION,
  UPDATE_RECOMENDATION_BY_ID,
  DELETE_RECOMENSATION_BY_ID,
} from "../controller/recommendation.js";

const router = express.Router();

router.get("/recommendations", GET_ALL_RECOMMENDATIONS);

router.get("/recommendations/:id", GET_RECOMENDATION_BY_ID);

router.delete("/recommendations", DELETE_ALL_RECOMENDATION);
router.delete("/recommendations/:id", DELETE_RECOMENSATION_BY_ID);

router.post("/recommendations", INSERT_RECOMENDATION);
router.put("/recommendations/:id", UPDATE_RECOMENDATION_BY_ID);

export default router;
