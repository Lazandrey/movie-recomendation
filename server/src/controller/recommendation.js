const { v4: uuidv4 } = require("uuid");

const { loadRecommendations, saveRecommendations } = require("../utils/utils");

const recommendations = loadRecommendations();

const isTitleExist = (title) => {
  return recommendations.some(
    (recommendation) => recommendation.title === title
  );
};

module.exports.GET_ALL_RECOMMENDATIONS = (req, res) => {
  if (!(recommendations.length === 0)) {
    return res
      .status(200)
      .json({ response: "success", recommendations: recommendations });
  } else {
    return res.status(200).json({ responce: "Data not exist" });
  }
};

module.exports.GET_RECOMENDATION_BY_ID = (req, res) => {
  const recommendation = recommendations.find(
    (recommendation) => recommendation.id === req.params.id
  );
  if (!recommendation) {
    return res.status(404).json({ responce: "Data not exist" });
  }

  return res
    .status(200)
    .json({ responce: "Ok", recommendation: recommendation });
};

module.exports.GET_ALL_RECOMMENDATIONS_BY_IMDB = (req, res) => {
  if (!(recommendations.length === 0)) {
    return res.status(200).json({
      response: "success",
      recommendations: [...recommendations].sort(
        (a, b) => Number(b.rating) - Number(a.rating)
      ),
    });
  } else {
    return res.status(200).json({ responce: "Data not exist" });
  }
};

module.exports.DELETE_AD_RECOMENDATION = (req, res) => {
  recommendations.length = 0;
  saveRecommendations(recommendations);
  return res.status(200).json({ response: "all recommendations were deleted" });
};

module.exports.INSERT_RECOMENDATION = (req, res) => {
  const recommendation = {
    id: uuidv4(),
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description,
    imdbLink: req.body.imdbLink,
  };
  try {
    if (isTitleExist(recommendation.title)) {
      throw new Error("Title already exist");
    }
  } catch (err) {
    return res.status(409).json({ response: err.message });
  }
  recommendations.push(recommendation);

  saveRecommendations(recommendations);
  return res.status(201).json({
    response: "Recommendation was inserted successfully",
    recommendation: recommendation,
  });
};
module.exports.UPDATE_RECOMENDATION = (req, res) => {
  const recommendation = {
    id: req.body.id,
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description,
    imdbLink: req.body.imdbLink,
  };
  const index = recommendations.findIndex(
    (recommendation) => recommendation.id === req.body.id
  );

  try {
    if (index < 0) {
      throw new Error("Recommendation not found");
    }
  } catch (err) {
    return res.status(404).json({ response: err.message });
  }

  recommendations[index] = recommendation;

  saveRecommendations(recommendations);
  return res.status(201).json({
    response: "Recommendation was updated successfully",
    recommendation: recommendation,
  });
};

module.exports.GET_BEST_RECOMENDATION_BY_IMDB = (req, res) => {
  if (!(recommendations.length === 0)) {
    return res.status(200).json({
      response: "success",
      recommendations: [...recommendations]
        .sort((a, b) => Number(b.rating) - Number(a.rating))
        .slice(0, 1),
    });
  } else {
    return res.status(200).json({ responce: "Data not exist" });
  }
};

module.exports.GET_MOVIES_HIGHER_THAN = (req, res) => {
  if (!(recommendations.length === 0)) {
    return res.status(200).json({
      response: "success",
      recommendations: [...recommendations].filter(
        (recommendation) =>
          Number(recommendation.rating) >= Number(req.params.raiting)
      ),
    });
  } else {
    return res.status(200).json({ responce: "Data not exist" });
  }
};
