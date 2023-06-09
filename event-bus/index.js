//create new express app with bodyParser and axios
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

//create new express app
const app = express();
app.use(bodyParser.json());
//create new express router

//create a post request handler on /events
app.post("/events", async (req, res) => {
  //get the type and data from req.body
  const { type, data } = req.body;

  //if type is PostCreated, send a post request to the event bus with type PostCreated and data
  if (type === "PostCreated") {
    const event = req.body;

    await axios.post("http://localhost:4000/events", event).catch((err) => {
      console.log(err);
    });
    await axios.post("http://localhost:4001/events", event).catch((err) => {
      console.log(err);
    });
    await axios.post("http://localhost:4002/events", event).catch((err) => {
      console.log(err);
    });
  }

  //send back a status of 200
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
