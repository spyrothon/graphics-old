import create from "zustand";

import type { Scene } from "obs-websocket-js";
import type { Transition } from "./OBSTypes";

interface OBSStoreState {
  connected: boolean;
  failed: boolean;
  sceneList: Scene[];
  transitionList: Transition[];
}

export const useOBSStore = create<OBSStoreState>((_set) => ({
  connected: false,
  failed: false,
  sceneList: [],
  transitionList: [],
}));

export function setOBSConnected(connected: boolean) {
  useOBSStore.setState((state) => ({ connected, failed: connected ? false : state.failed }));
}

export function setOBSFailed() {
  useOBSStore.setState({ connected: false, failed: true });
}

export function useOBSConnected() {
  return useOBSStore((state) => [state.connected, state.failed]);
}

export function setSceneList(sceneList: Scene[]) {
  useOBSStore.setState({ sceneList });
}

export function setTransitionList(transitionList: Transition[]) {
  useOBSStore.setState({ transitionList });
}
