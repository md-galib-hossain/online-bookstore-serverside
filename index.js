const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORt || 5000;

app.use(cors());
const categories = require("./data/categories.json");
const courses = require("./data/courses.json");
app.get("/", (req, res) => {
  res.send("course api running");
});
app.get("/categories", (req, res) => {
  res.send(categories);
});
app.get("/courses/:id", (req, res) => {
  console.log(req.params.id);
});
app.listen(port, () => {
  console.log("server running on port:", port);
});
//check
