import { Team, TeamAction, TeamActionTypes } from "./TeamTypes";

import { ActionFor } from "../../Actions";

type TeamState = {
  [id: string]: Team;
};

const defaultState: TeamState = {};

function handleReceiveTeams(state: TeamState, { data }: ActionFor<"RECEIVE_TEAMS">) {
  const { teams } = data;
  const teamsById = teams.reduce((acc, team) => {
    // @ts-ignore
    acc[team.id] = team;
    return acc;
  }, {});

  return {
    ...state,
    ...teamsById,
  };
}

export function teamsReducer(state = defaultState, action: TeamAction): TeamState {
  switch (action.type) {
    case TeamActionTypes.RECEIVE_TEAMS:
      return handleReceiveTeams(state, action);
  }

  return state;
}
