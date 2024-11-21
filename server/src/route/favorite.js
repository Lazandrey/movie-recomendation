import express from "express";
import auth from "../middleware/auth.js";

import {
  GET_ALL_FAVORITES,
  GET_FAVORITE_BY_ID,
  DELETE_ALL_FAVORITES,
  INSERT_FAVORITE,
  DELETE_FAVORITE_BY_ID,
} from "../controller/favorites.js";

const router = express.Router();

router.get("/favorites", auth, GET_ALL_FAVORITES);
router.get("/favorites/:id", auth, GET_FAVORITE_BY_ID);
router.delete("/favorites", auth, DELETE_ALL_FAVORITES);
router.delete("/favorites/:id", auth, DELETE_FAVORITE_BY_ID);
router.post("/favorites", auth, INSERT_FAVORITE);

export default router;
