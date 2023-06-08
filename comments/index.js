//create express app
const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());

//create a route to get comments using '/posts/:id/comments
const commentsByPostsId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostsId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostsId[req.params.id] || [];

  comments.push({ id: commentId, content });
  commentsByPostsId[req.params.id] = comments;

  res.status(201).send(comments);
});

const port = 4001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
