const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const {
  private: { HOSTNAME, PORT },
} = require("../config/production.json");

app.use(cors());
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "../public") });
});

app.listen(PORT, HOSTNAME, function () {
  console.log(`App is running at ${HOSTNAME}: ${PORT}`);
});
