import mongoose from "mongoose";

const favoriteSchema = mongoose.Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  movieId: { type: String, required: true },
});

export default mongoose.model("Favorite", favoriteSchema);
