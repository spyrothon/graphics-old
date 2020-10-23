import * as React from "react";

import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import Text from "../../uikit/Text";
import AddRunButton from "./AddRunButton";
import { fetchRuns, setCurrentRun } from "./RunActions";
import RunListRow from "./RunListRow";
import * as RunStore from "./RunStore";

import styles from "./RunList.mod.css";

type RunListProps = {
  className?: string;
};

export default function RunList(props: RunListProps) {
  const { className } = props;
  const dispatch = useSafeDispatch();

  const { isFetching, runs, currentRunId } = useSafeSelector((state) => ({
    isFetching: RunStore.isFetchingRuns(state),
    runs: RunStore.getRuns(state),
    currentRunId: RunStore.getCurrentRunId(state),
  }));

  React.useEffect(() => {
    dispatch(fetchRuns());
  }, []);

  // Auto-select the first run when the runs are first loaded
  React.useEffect(() => {
    if (isFetching) return;

    const firstRunId = runs[0]?.id;
    dispatch(setCurrentRun(firstRunId));
    // Only want this to run immediately after the runs have loaded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  function handleRunSelected(runId: string) {
    dispatch(setCurrentRun(runId));
  }

  function handleAddRun() {
    dispatch(setCurrentRun(undefined));
  }

  return (
    <div className={className}>
      {isFetching ? (
        <Text className={styles.fetching}>Fetching Runs</Text>
      ) : (
        runs.map((run, index) => (
          <RunListRow
            key={run.id}
            run={run}
            index={index + 1}
            selected={run.id === currentRunId}
            onClick={() => handleRunSelected(run.id)}
          />
        ))
      )}
      <AddRunButton onClick={() => handleAddRun()} />
    </div>
  );
}
