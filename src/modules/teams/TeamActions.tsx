import { commonThunk } from "../../util/Thunk";
import { Team, TeamActionTypes } from "./TeamTypes";

type TeamsResponse = {
  teams: Team[];
};

export function fetchTeams(eventId: string) {
  return commonThunk(
    {
      method: "GET",
      path: `/api/v1/events/${eventId}/teams`,
      name: "teams",
    },
    (dispatch, response: TeamsResponse) => {
      dispatch(receiveTeams(response.teams));
    },
  );
}

type TeamResponse = {
  team: Team;
};

export function fetchTeam(teamId: string) {
  return commonThunk(
    {
      method: "GET",
      path: `/api/v1/teams/${teamId}`,
      name: `teams.${teamId}`,
    },
    (dispatch, response: TeamResponse) => {
      dispatch(receiveTeams([response.team]));
    },
  );
}

export function receiveTeams(teams: Team[]) {
  return {
    type: TeamActionTypes.RECEIVE_TEAMS,
    data: {
      teams,
    },
  };
}
