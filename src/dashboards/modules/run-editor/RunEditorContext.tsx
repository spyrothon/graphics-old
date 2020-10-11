import * as React from "react";
import { RunInfo } from "../../../modules/run-info/RunInfoTypes";
import { createRunInfo } from "../../../modules/run-info/RunInfo";

type RunEditorState = {
  baseRun?: RunInfo;
  currentRunId?: RunInfo["id"];
  runEdits: Partial<RunInfo>;
};

type RunEditorAction =
  | { type: "setBaseRun"; run: RunInfo }
  | { type: "updateField"; field: keyof RunInfo; value: RunInfo[keyof RunInfo] };

function runEditorReducer(state: RunEditorState, action: RunEditorAction) {
  switch (action.type) {
    case "setBaseRun":
      return { ...state, baseRun: action.run, currentRunId: action.run.id, runEdits: {} };
    case "updateField":
      return { ...state, runEdits: { ...state.runEdits, [action.field]: action.value } };
    default:
      return state;
  }
}

export function useRunEditorState(): RunEditorStateValue {
  const [state, dispatch] = React.useReducer(runEditorReducer, { runEdits: {} });

  return React.useMemo(
    () => ({
      state,
      setBaseRun: (run: RunInfo) => dispatch({ type: "setBaseRun", run }),
      updateField: <F extends keyof RunInfo>(field: F, value: RunInfo[F]) =>
        dispatch({ type: "updateField", field, value }),
      getField: <F extends keyof RunInfo>(field: F): RunInfo[F] | undefined =>
        (state.runEdits[field] as RunInfo[F]) ?? state.baseRun?.[field],
      getEditedRun: (): RunInfo => ({ ...state.baseRun, ...state.runEdits } as RunInfo),
    }),
    [state],
  );
}

const NON_RUN = createRunInfo({ id: "-1" });

type RunEditorStateValue = {
  state: RunEditorState;
  setBaseRun: (run: RunInfo) => void;
  updateField: <F extends keyof RunInfo>(field: F, value: RunInfo[F]) => void;
  getField: <F extends keyof RunInfo>(field: F) => RunInfo[F] | undefined;
  getEditedRun: () => RunInfo | undefined;
};

const RunEditorContext = React.createContext<RunEditorStateValue>({
  state: { baseRun: NON_RUN, runEdits: {} },
  setBaseRun: () => null,
  updateField: () => null,
  getField: () => undefined,
  getEditedRun: () => undefined,
});

export default RunEditorContext;
