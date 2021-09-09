import OBSWebSocket from "obs-websocket-js";

import { OBSWebsocketConfig } from "../../../api/APITypes";
import { setOBSConnected, setOBSFailed } from "./OBSStore";

const obs = new OBSWebSocket();

obs.on("ConnectionOpened", () => setOBSConnected(true));
obs.on("ConnectionClosed", () => setOBSConnected(false));

class OBS {
  async connect(config: OBSWebsocketConfig) {
    await obs
      .connect({
        address: `${config.host}:${config.port}`,
        password: config.password,
      })
      .catch(() => setOBSFailed());

    return this;
  }

  async disconnect() {
    obs.disconnect();
    return this;
  }

  getScenes() {
    return obs.send("GetSceneList");
  }

  setScene(sceneName: string) {
    return obs.send("SetPreviewScene", { "scene-name": sceneName });
  }
}

export default new OBS();
