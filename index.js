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
//Load all course in home page
app.get("/courses", (req, res) => {
  res.send(courses);
});
// Load courses by category
app.get("/category/:id", (req, res) => {
  const id = req.params.id;
  // id 7 diye all course load remove kore disi
  if (id == "7") {
    res.send(courses);
  } else {
    const categoryCourse = courses.filter((course) => course.idno == id);
    res.send(categoryCourse);
  }
});
// Load specific course
app.get("/courses/:id", (req, res) => {
  const id = req.params.id;
  const selectedCourse = courses.find((course) => course._id == id);
  res.send(selectedCourse);
});
app.listen(port, () => {
  console.log("server running on port:", port);
});
