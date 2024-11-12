import fs from "node:fs";
import fsasync from "node:fs/promises";
import recommendationModel from "../model/recommendation.js";

const saveFilePath = "./recommendations.txt";

const loadRecommendations = () => {
  try {
    const data = fs.readFileSync(saveFilePath, {
      encoding: "utf8",
    });
    return JSON.parse(data);
  } catch (err) {
    console.log(err, "file  not found, make new database");
    return [];
  }
};

const saveRecommendations = async (recommendations) => {
  try {
    await fsasync.writeFile(saveFilePath, JSON.stringify(recommendations));
  } catch (err) {
    console.log(err);
  }
};

const copyToDB = async () => {
  const recommendations = loadRecommendations();

  recommendations.forEach(async (recommendation) => {
    try {
      const rec = new recommendationModel(recommendation);
      const response = await rec.save();
      console.log(response.id);
    } catch (err) {
      console.log(err);
    }
  });
};

export { loadRecommendations, saveRecommendations, copyToDB };
