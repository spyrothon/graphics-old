const WS = require("ws");
const path = require("path");

const configPath = path.resolve(__dirname, `../config/${process.env.NODE_ENV}.json`);
const config = require(configPath);

const wss = new WS.Server({ port: config.SYNC_HOST_PORT });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    if (message === "ping") return;

    console.log("received: %s", message);
    wss.clients.forEach((client) => {
      if (client === ws || client.readyState !== WS.OPEN) return;
      console.log("sending to client");
      client.send(message);
    });
  });
});

console.log("Testing Socket Server started, listening on port", config.SYNC_HOST_PORT);
