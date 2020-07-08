import { commonThunk, denulled } from "../../util/Thunk";
import { EVENT_ID } from "../../Constants";
import { Run, RunActionTypes, RunAction } from "./RunTypes";

type FetchRunOptions = {
  teamId?: string;
  runIds?: string;
};

type RunsResponse = {
  runs: Run[];
};

export function fetchRuns(eventId = EVENT_ID, { teamId, runIds }: FetchRunOptions = {}) {
  return commonThunk(
    {
      method: "GET",
      path: `/api/v1/runs`,
      name: "runs",
      query: denulled({
        event_id: eventId,
        team_id: teamId,
        run_ids: runIds,
      }),
    },
    (dispatch, response: RunsResponse) => {
      dispatch(receiveRuns(response.runs));
    },
  );
}

type RunResponse = {
  run: Run;
};

export function fetchRun(runId: string) {
  return commonThunk(
    {
      method: "GET",
      path: `/api/v1/events/${EVENT_ID}/runs/${runId}`,
      name: `runs.${runId}`,
    },
    (dispatch, response: RunResponse) => {
      dispatch(receiveRuns([response.run]));
    },
  );
}

export function receiveRuns(runs: Run[]): RunAction {
  return {
    type: RunActionTypes.RECEIVE_RUNS,
    data: {
      runs,
    },
  };
}

// TODO: I guess type this from the server's RunUpdate?
export function receiveRunUpdate(data: any): RunAction {
  const { run_id: runId, type, id: updateId, extra } = data;

  return {
    type: RunActionTypes.RECEIVE_RUN_UPDATE,
    data: {
      runId,
      type,
      updateId,
      extra,
    },
  };
}

export function runUpdateHandled(updateId: string) {
  return {
    type: RunActionTypes.RUN_UPDATE_HANDLED,
    data: {
      updateId,
    },
  };
}
