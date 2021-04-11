const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const records = require("../database/data.json");
const { Record } = require("../database/model");

route.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ error: "Email & Password is Required" });

  const user = { email }; // with other user metadata

  const accessToken = jwt.sign(user, process.env.JWT_SECRET); // Need Refresh Token Setup in Production  { expiresIn: "30m"}

  res.json({ accessToken });
});

route.post("/process", authMiddleware, async (req, res) => {
  try {
    await Record.bulkCreate(records);
    res.json({
      success: true,
      message: "Data Processing Finished  Successfully",
    });
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

route.get("/fetch", authMiddleware, async (req, res) => {
  const records = await Record.findAll(); // must paginated due to large amount of data
  res.json({ data: records });
});

route.all("*", (req, res) =>
  res.status(404).json({ error: "No Endpoint Found" })
);

module.exports = route;
