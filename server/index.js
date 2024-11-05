const express = require("express");
const cors = require("cors");
const recommendationRouter = require("./src/route/recommendation");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(recommendationRouter);

app.use((req, res) => {
  res.status(404).json({ response: "your endpoint does not exit" });
});

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
