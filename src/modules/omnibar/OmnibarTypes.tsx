export enum OmnibarActionTypes {
  OMNI_SET_HIGHLIGHTED_TEAM = "OMNI_SET_HIGHLIGHTED_TEAM",
}

export type OmnibarAction = {
  type: "OMNI_SET_HIGHLIGHTED_TEAM";
  data: { teamId: string };
};
