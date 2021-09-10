import create from "zustand";

import type { Scene } from "obs-websocket-js";
import type { OBSTransition, OBSMediaSource } from "./OBSTypes";

interface OBSStoreState {
  connected: boolean;
  failed: boolean;
  sceneList: Scene[];
  transitionList: OBSTransition[];
  mediaSourceList: OBSMediaSource[];
  busy: {
    busy: boolean;
    originator?: string;
  };
}

export const useOBSStore = create<OBSStoreState>((_set) => ({
  connected: false,
  failed: false,
  busy: { busy: false },
  sceneList: [],
  transitionList: [],
  mediaSourceList: [],
}));

export function setOBSConnected(connected: boolean) {
  useOBSStore.setState((state) => ({ connected, failed: connected ? false : state.failed }));
}

export function setOBSFailed() {
  useOBSStore.setState({ connected: false, failed: true });
}

export function setOBSBusy(busy: boolean, originator?: string) {
  useOBSStore.setState({ busy: { busy, originator } });
}

export function useOBSConnected() {
  return useOBSStore((state) => [state.connected, state.failed]);
}

export function useOBSBusy() {
  return useOBSStore((state) => state.busy);
}

export function setSceneList(sceneList: Scene[]) {
  useOBSStore.setState({ sceneList });
}

export function setMediaSourceList(mediaSourceList: OBSMediaSource[]) {
  useOBSStore.setState({ mediaSourceList });
}

export function setTransitionList(transitionList: OBSTransition[]) {
  useOBSStore.setState({ transitionList });
}
