import * as React from "react";
import classNames from "classnames";

import { useSafeSelector } from "../../../Store";
import useSafeDispatch from "../../../hooks/useDispatch";
import { fetchRuns } from "../../../modules/run-info/RunInfoActions";
import * as RunInfoStore from "../../../modules/run-info/RunInfoStore";
import { RunInfo } from "../../../modules/run-info/RunInfoTypes";
import RunEditorContext from "../run-editor/RunEditorContext";
import Text from "../../uikit/Text";
import AddRunButton from "./AddRunButton";
import RunRow from "./RunRow";

import styles from "./RunList.mod.css";

type RunListProps = {
  className?: string;
};

export default function RunList(props: RunListProps) {
  const { className } = props;
  const dispatch = useSafeDispatch();
  const { state: editorState, setBaseRun } = React.useContext(RunEditorContext);

  const { isFetching, runs } = useSafeSelector((state) => ({
    isFetching: RunInfoStore.isFetchingRuns(state),
    runs: RunInfoStore.getRuns(state),
  }));

  React.useEffect(() => {
    dispatch(fetchRuns());
  }, []);

  function handleRunSelected(run: RunInfo) {
    setBaseRun(run);
  }

  return (
    <div className={classNames(styles.container, className)}>
      {isFetching ? (
        <Text>Fetching Runs</Text>
      ) : (
        runs.map((run, index) => (
          <RunRow
            key={run.id}
            run={run}
            index={index + 1}
            selected={run.id === editorState.currentRunId}
            onClick={() => handleRunSelected(run)}
          />
        ))
      )}
      <AddRunButton onClick={() => null} />
    </div>
  );
}
