//create new express app
const express = require("express");
const { randomBytes } = require("crypto");
const app = express();

// create an object to store any post created
const posts = {};

//create a route to get and post posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  //generate unique id using randomBytes from crypto
  const id = crypto.randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

const port = 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
