const express = require("express");
require("express-async-errors");
const routes = require("./routes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("Body", req.body);
  console.log("A new request received at " + Date.now());
  next();
});

app.use(routes);

app.use((error, req, res, next) => {
  console.log("Error", error);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
