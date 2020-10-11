import { SafeDispatch } from "../../../hooks/useDispatch";
import RemoteActionSenderManager from "../../../modules/remote/RemoteActionSenderManager";
import { fromServer, toServer } from "../../../modules/run-info/RunInfo";
import { updateRun } from "../../../modules/run-info/RunInfoActions";
import { RunInfo, RunInfoActionType } from "../../../modules/run-info/RunInfoTypes";
import HTTPUtils from "../../../util/HTTPUtils";

import { Endpoints } from "../../../Constants";

export function saveRun(run: RunInfo) {
  return async (dispatch: SafeDispatch) => {
    await dispatch(persistRun(run));
    RemoteActionSenderManager.send(updateRun(run));
  };
}

export function persistRun(runInfo: RunInfo) {
  return async (dispatch: SafeDispatch) => {
    dispatch({ type: RunInfoActionType.RUN_INFO_PERSIST_RUN_STARTED, runId: runInfo.id });

    const runResponse = await HTTPUtils.put(Endpoints.UPDATE_RUN(runInfo.id), toServer(runInfo));
    dispatch({
      type: RunInfoActionType.RUN_INFO_PERSIST_RUN_SUCCESS,
      runInfo: fromServer(runResponse),
    });
  };
}
