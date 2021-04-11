const express = require("express");
const env = require("dotenv");
const route = require("./routes/apiRoutes");

env.config();

const app = express();

app.use(express.json());

app.use("/api", route);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server Running: ${process.env.PORT}`)
);
