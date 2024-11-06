import fs from "node:fs";
import fsasync from "node:fs/promises";

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

export { loadRecommendations, saveRecommendations };
