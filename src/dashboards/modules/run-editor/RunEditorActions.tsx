import { SafeDispatch } from "../../../hooks/useDispatch";
import RemoteActionSenderManager from "../../../modules/remote/RemoteActionSenderManager";
import { updateRun, persistRun } from "../../../modules/run-info/RunInfoActions";
import type { RunInfo } from "../../../modules/run-info/RunInfoTypes";

export function saveRun(run: RunInfo) {
  return async (dispatch: SafeDispatch) => {
    await dispatch(persistRun(run));
    RemoteActionSenderManager.send(updateRun(run));
  }
}
