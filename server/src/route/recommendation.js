import express from "express";

import {
  GET_ALL_RECOMMENDATIONS,
  GET_RECOMENDATION_BY_ID,
  GET_ALL_RECOMMENDATIONS_BY_IMDB,
  DELETE_AD_RECOMENDATION,
  INSERT_RECOMENDATION,
  UPDATE_RECOMENDATION,
  GET_BEST_RECOMENDATION_BY_IMDB,
  GET_MOVIES_HIGHER_THAN,
} from "../controller/recommendation.js";

const router = express.Router();

router.get("/recommendations", GET_ALL_RECOMMENDATIONS);

router.get("/recommendations/:id", GET_RECOMENDATION_BY_ID);

router.get("/recommendationsByIMDB", GET_ALL_RECOMMENDATIONS_BY_IMDB);

router.delete("/recommendations", DELETE_AD_RECOMENDATION);

router.post("/recommendations", INSERT_RECOMENDATION);
router.post("/updateRecomendation", UPDATE_RECOMENDATION);

router.get("/recommendationsBestByIMDB", GET_BEST_RECOMENDATION_BY_IMDB);
router.get("/recommendationsIMDBMore/:raiting", GET_MOVIES_HIGHER_THAN);

export default router;
