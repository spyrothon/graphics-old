import { PreshowActionTypes } from "./PreshowTypes";

export function setTeam(teamId: string) {
  return {
    type: PreshowActionTypes.PRESHOW_SET_OVERLAY,
    data: {
      type: "team",
      teamId,
    },
  };
}

export function setWR() {
  return {
    type: PreshowActionTypes.PRESHOW_SET_OVERLAY,
    data: {
      type: "wr",
      year: "old",
    },
  };
}

export function clearActiveOverlay() {
  return {
    type: PreshowActionTypes.PRESHOW_SET_OVERLAY,
    data: {
      type: null,
      year: null,
      teamId: null,
    },
  };
}
