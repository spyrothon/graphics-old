const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const [appName] = process.argv.slice(2);

const appPath = path.join(__dirname, `../public/${appName}`);

const {
  private: {
    [appName]: { HOSTNAME, PORT },
  },
} = require("../config/production.json");

app.use(cors());
app.use(morgan("combined"));
app.use(express.static(appPath));

app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: appPath });
});

app.listen(PORT, HOSTNAME, function () {
  console.log(`App is running at ${HOSTNAME}: ${PORT}`);
});
