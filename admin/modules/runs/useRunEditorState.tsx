import * as React from "react";

import { Run } from "../../../api/APITypes";

type RunEditorState = {
  baseRun?: Run;
  runEdits: Partial<Run>;
  valid: boolean;
};

type RunEditorAction =
  | { type: "setBaseRun"; run?: Run }
  | { type: "updateField"; field: keyof Run; value: Run[keyof Run] };

function runEditorReducer(state: RunEditorState, action: RunEditorAction) {
  switch (action.type) {
    case "setBaseRun":
      return { ...state, baseRun: action.run, runEdits: {} };
    case "updateField":
      return { ...state, runEdits: { ...state.runEdits, [action.field]: action.value } };
    default:
      return state;
  }
}

type RunEditorStateValue = {
  state: RunEditorState;
  setBaseRun: (run?: Run) => unknown;
  updateField: <F extends keyof Run>(field: F, value: Run[F]) => unknown;
  getField: <F extends keyof Run>(field: F) => Run[F] | undefined;
  getEditedRun: () => Run;
};

export default function useRunEditorState(): RunEditorStateValue {
  const [state, dispatch] = React.useReducer(runEditorReducer, { runEdits: {}, valid: false });

  return {
    state,
    setBaseRun: (run?: Run) => dispatch({ type: "setBaseRun", run }),
    updateField: <F extends keyof Run>(field: F, value: Run[F]) =>
      dispatch({ type: "updateField", field, value }),
    getField: <F extends keyof Run>(field: F): Run[F] | undefined =>
      (state.runEdits[field] as Run[F]) ?? state.baseRun?.[field],
    getEditedRun: (): Run => ({ ...state.baseRun, ...state.runEdits } as Run),
  };
}
