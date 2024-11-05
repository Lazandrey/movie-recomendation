const express = require("express");

const {
  GET_ALL_RECOMMENDATIONS,
  GET_RECOMENDATION_BY_ID,
  GET_ALL_RECOMMENDATIONS_BY_IMDB,
  DELETE_AD_RECOMENDATION,
  INSERT_RECOMENDATION,
  UPDATE_RECOMENDATION,
  GET_BEST_RECOMENDATION_BY_IMDB,
  GET_MOVIES_HIGHER_THAN,
} = require("../controller/recommendation");

const router = express.Router();

router.get("/getAllRecommendations", GET_ALL_RECOMMENDATIONS);

router.get("/getRecommendationById/:id", GET_RECOMENDATION_BY_ID);

router.get("/getAllRecommendationsByIMDB", GET_ALL_RECOMMENDATIONS_BY_IMDB);

router.delete("/deleteAllRecommendations", DELETE_AD_RECOMENDATION);

router.post("/insertRecomentation", INSERT_RECOMENDATION);
router.post("/updateRecomendation", UPDATE_RECOMENDATION);

router.get("/getBestRecommendationByIMDB", GET_BEST_RECOMENDATION_BY_IMDB);
router.get("/getMoviesHigherThan/:raiting", GET_MOVIES_HIGHER_THAN);

module.exports = router;
