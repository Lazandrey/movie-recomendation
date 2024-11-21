import { v4 as uuidv4 } from "uuid";
import favoriteModel from "../model/favorite.js";

const isFavoriteExist = async (favorite) => {
  try {
    const favoriteCheck = await favoriteModel.findOne({
      userId: favorite.userId,
      movieId: favorite.movieId,
    });
    return favoriteCheck ? true : false;
  } catch (err) {
    console.log(err);
  }
};

const GET_ALL_FAVORITES = async (req, res) => {
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
    query.userId = req.body.userId;

    const results = await favoriteModel.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "id",
          as: "userDetails",
          pipeline: [
            {
              $project: {
                name: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "recommendations",
          localField: "movieId",
          foreignField: "id",
          as: "movieDetails",
        },
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$movieDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    if (results.length === 0) {
      return res.status(200).json({ responce: "Data not exist" });
    }

    return res.status(200).json({
      response: "success",
      favorites: results,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_FAVORITE_BY_ID = async (req, res) => {
  try {
    const favorite = await favoriteModel.findOne({ id: req.params.id });
    if (!favorite) {
      return res.status(404).json({ responce: "Data not exist" });
    }
    if (favorite.userId !== req.body.userId) {
      return res.status(403).json({ responce: "Forbidden" });
    }

    return res.status(200).json({ responce: "Ok", favorite: favorite });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const DELETE_ALL_FAVORITES = async (req, res) => {
  try {
    const recordsQty = await favoriteModel.countDocuments({
      userId: req.body.userId,
    });

    const response = await favoriteModel.deleteMany({
      userId: req.body.userId,
    });

    if (!response.deletedCount == recordsQty) {
      return res.status(404).json({ response: "Favorites not found" });
    }

    return res
      .status(200)
      .json({ response: "Favorites was deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const INSERT_FAVORITE = async (req, res) => {
  const newFavorite = {
    id: uuidv4(),
    userId: req.body.userId,
    movieId: req.body.movieId,
  };
  try {
    if (await isFavoriteExist(newFavorite)) {
      throw new Error("Favorite already exist");
    }
  } catch (err) {
    return res.status(409).json({ response: err.message });
  }
  try {
    const favorite = new favoriteModel(newFavorite);
    const response = await favorite.save();

    return res.status(201).json({
      response: "Favorite was inserted successfully",
      favorite: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const DELETE_FAVORITE_BY_ID = async (req, res) => {
  try {
    const favorite = await favoriteModel.findOne({ id: req.params.id });

    if (!favorite) {
      return res.status(404).json({ responce: "Data not exist" });
    }
    if (favorite.userId !== req.body.userId) {
      return res.status(403).json({ responce: "Forbidden" });
    }

    const response = await favoriteModel.deleteOne({ id: req.params.id });

    if (!response.deletedCount) {
      return res.status(404).json({ response: "Favorite not found" });
    }

    return res
      .status(200)
      .json({ response: "Favorite was deleted successfully" });
  } catch (err) {
    return res.status(404).json({ response: err.message });
  }
};

export {
  GET_ALL_FAVORITES,
  GET_FAVORITE_BY_ID,
  DELETE_ALL_FAVORITES,
  INSERT_FAVORITE,
  DELETE_FAVORITE_BY_ID,
};
