import create from "zustand";

interface OBSStoreState {
  connected: boolean;
  failed: boolean;
}

export const useOBSStore = create<OBSStoreState>((_set) => ({
  connected: false,
  failed: false,
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
