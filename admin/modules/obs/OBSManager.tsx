import OBS from "./OBS";
import { store } from "../../Store";
import * as ScheduleStore from "../schedules/ScheduleStore";

import type { OBSWebsocketConfig } from "@api/APITypes";

export default {
  init() {
    let prevConfig: OBSWebsocketConfig | undefined;

    store.subscribe(() => {
      const state = store.getState();
      const config = ScheduleStore.getOBSConfig(state);
      if (config !== prevConfig && config != null) {
        OBS.connect(config);
      }
      prevConfig = config;
    });
  },

  destroy() {
    OBS.disconnect();
  },
};
