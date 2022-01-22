import OBSWebSocket from "obs-websocket-js";

import { SOCKET_WEBSOCKET_PROTOCOL } from "@api/Config";
import { OBSWebsocketConfig, Transition, TransitionSet } from "@api/APITypes";
import SyncSocketManager from "../sync/SyncSocketManager";
import OBSEventQueue from "./OBSEventQueue";
import {
  setOBSConnected,
  setOBSFailed,
  setSceneList,
  setTransitionList,
  setOBSBusy,
  setMediaSourceList,
} from "./OBSStore";
import { OBSCustomEvent, OBSCustomEventTypes } from "./OBSTypes";

const obs = new OBSWebSocket();

obs.on("ConnectionOpened", () => setOBSConnected(true));
obs.on("ConnectionClosed", () => setOBSConnected(false));
obs.on("error", console.error);
obs.on("BroadcastCustomMessage", handleCustomMessage);

function handleCustomMessage({ data }: { data: {} }) {
  const message = data as OBSCustomEvent;
  switch (message.type) {
    case OBSCustomEventTypes.TRANSITION_SEQUENCE_STARTED:
      setOBSBusy(true, message.originator);
      break;
    case OBSCustomEventTypes.TRANSITION_SEQUENCE_ENDED:
      setOBSBusy(false, message.originator);
      break;
  }
}

class OBS {
  private eventQueue: OBSEventQueue;

  constructor() {
    this.eventQueue = new OBSEventQueue(obs);
  }

  async connect(config: OBSWebsocketConfig) {
    await obs
      .connect({
        address: `${config.host}:${config.port}`,
        password: config.password,
        secure: SOCKET_WEBSOCKET_PROTOCOL === "wss",
      })
      .then(() => {
        this._preload();
      })
      .catch(() => setOBSFailed());

    return this;
  }

  _preload() {
    this.getScenes().then((response) => setSceneList(response.scenes));
    this.getTransitions().then((response) => setTransitionList(response.transitions));
    this.getMediaSources().then((response) => setMediaSourceList(response.mediaSources));
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

  getMediaSources() {
    return obs.send("GetMediaSourcesList");
  }

  getTransitions() {
    return obs.send("GetTransitionList");
  }

  async executeTransition(transition: Transition) {
    const {
      sceneDuration,
      obsMediaSourceName,
      obsSceneName,
      obsTransitionInName,
      transitionDuration,
    } = transition;
    let waitTime = sceneDuration ?? 0;
    if (waitTime === 0 && obsMediaSourceName != null) {
      const { mediaDuration } = await obs.send("GetMediaDuration", {
        sourceName: obsMediaSourceName,
      });
      waitTime = mediaDuration + 100;
    }

    await obs.send("SetPreviewScene", { "scene-name": obsSceneName });
    return new Promise((resolve) => {
      this.eventQueue.onNext("TransitionEnd").then(() => setTimeout(resolve, waitTime));
      obs.send("TransitionToProgram", {
        "with-transition": { name: obsTransitionInName, duration: transitionDuration },
      });
    });
  }

  async executeTransitionSet(transitionSet: TransitionSet) {
    await this.broadcast({ type: OBSCustomEventTypes.TRANSITION_SEQUENCE_STARTED });
    for (const transition of transitionSet.transitions) {
      SyncSocketManager.send({
        type: "obs_transition_started",
        setId: transitionSet.id,
        transitionId: transition.id,
      });
      await this.executeTransition(transition);
      SyncSocketManager.send({
        type: "obs_transition_finished",
        setId: transitionSet.id,
        transitionId: transition.id,
      });
    }
    await this.broadcast({ type: OBSCustomEventTypes.TRANSITION_SEQUENCE_ENDED });
  }

  async setPreviewScene(sceneName: string) {
    await obs.send("SetPreviewScene", { "scene-name": sceneName });
  }

  async broadcast(message: OBSCustomEvent) {
    obs.send("BroadcastCustomMessage", { realm: "admin", data: message });
  }
}

export default new OBS();
