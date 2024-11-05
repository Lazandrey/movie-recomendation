const fs = require("node:fs");
const fsasync = require("node:fs/promises");

const saveFilePath = "./recommendations.txt";

module.exports.loadRecommendations = () => {
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

module.exports.saveRecommendations = async (recommendations) => {
  try {
    await fsasync.writeFile(saveFilePath, JSON.stringify(recommendations));
  } catch (err) {
    console.log(err);
  }
};
