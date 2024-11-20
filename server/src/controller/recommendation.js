import { v4 as uuidv4 } from "uuid";
import recommendationModel from "../model/recommendation.js";

const isTitleExist = async (title) => {
  try {
    const recommendation = await recommendationModel.findOne({ title: title });
    return recommendation ? true : false;
  } catch (err) {
    console.log(err);
  }
};

const GET_ALL_RECOMMENDATIONS = async (req, res) => {
  console.log(req.body);
  try {
    let options = {};
    let query = {};
    if (req.query.sort == "imdb") {
      options.sort = "-rating";
    }

    if (req.query.more) {
      query = { rating: { $gte: Number(req.query.more) } };
    }

    if (req.query.best == "imdb") {
      options.sort = "-rating";
      options.limit = 1;
    }

    if (req.query.qty) {
      options.limit = Number(req.query.qty);
    } else {
      options.limit = 10;
    }

    const results = await recommendationModel.find(query, {}, options);
    if (results.length === 0) {
      return res.status(200).json({ responce: "Data not exist" });
    }

    return res.status(200).json({
      response: "success",
      recommendations: results,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_RECOMENDATION_BY_ID = async (req, res) => {
  try {
    const recommendation = await recommendationModel.findOne({
      id: req.params.id,
    });
    if (!recommendation) {
      return res.status(404).json({ responce: "Data not exist" });
    }
    return res
      .status(200)
      .json({ responce: "Ok", recommendation: recommendation });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const DELETE_ALL_RECOMENDATION = async (req, res) => {
  try {
    const recordsQty = await recommendationModel.countDocuments();

    const response = await recommendationModel.deleteMany();

    if (!response.deletedCount == recordsQty) {
      return res.status(404).json({ response: "Recommendations not found" });
    }

    return res
      .status(200)
      .json({ response: "Recommendations was deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const INSERT_RECOMENDATION = async (req, res) => {
  const newRecommendation = {
    id: uuidv4(),
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description,
    imdbLink: req.body.imdbLink,
  };
  try {
    if (await isTitleExist(newRecommendation.title)) {
      throw new Error("Title already exist");
    }
  } catch (err) {
    return res.status(409).json({ response: err.message });
  }
  try {
    const recommendation = new recommendationModel(newRecommendation);
    const response = await recommendation.save();

    return res.status(201).json({
      response: "Recommendation was inserted successfully",
      recommendation: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const UPDATE_RECOMENDATION_BY_ID = async (req, res) => {
  try {
    const recommendation = await recommendationModel.updateOne(
      {
        id: req.params.id,
      },
      { ...req.body }
    );
    if (!recommendation) {
      return res.status(404).json({ responce: "Data not exist" });
    }
    return res
      .status(200)
      .json({ responce: "Recommendation was updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const DELETE_RECOMENSATION_BY_ID = async (req, res) => {
  try {
    const response = await recommendationModel.deleteOne({ id: req.params.id });

    if (!response.deletedCount) {
      return res.status(404).json({ response: "Recommendation not found" });
    }

    return res
      .status(200)
      .json({ response: "Recommendation was deleted successfully" });
  } catch (err) {
    return res.status(404).json({ response: err.message });
  }
};

export {
  GET_ALL_RECOMMENDATIONS,
  GET_RECOMENDATION_BY_ID,
  DELETE_ALL_RECOMENDATION,
  INSERT_RECOMENDATION,
  UPDATE_RECOMENDATION_BY_ID,
  DELETE_RECOMENSATION_BY_ID,
};
