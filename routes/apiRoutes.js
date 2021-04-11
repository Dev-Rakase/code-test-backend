const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

route.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ error: "Email & Password is Required" });

  const user = { email }; // with other user metadata

  const accessToken = jwt.sign(user, process.env.JWT_SECRET); // Need Refresh Token Setup in Production  { expiresIn: "30m"}

  res.json({ accessToken });
});

route.post("/process", authMiddleware, (req, res) => {
  res.end("process");
});

route.get("/fetch", authMiddleware, (req, res) => {
  res.end("data");
});

route.all("*", (req, res) =>
  res.status(404).json({ error: "No Endpoint Found" })
);

module.exports = route;
