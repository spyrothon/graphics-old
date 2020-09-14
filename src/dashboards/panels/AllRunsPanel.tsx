import * as React from "react";

import { useSafeSelector } from "../../Store";
import { fetchRuns } from "../../modules/run-info/RunInfoActions";
import * as RunInfoStore from "../../modules/run-info/RunInfoStore";
import { RunInfo } from "../../modules/run-info/RunInfoTypes";
import Panel from "../uikit/Panel";
import Text from "../uikit/Text";
import useSafeDispatch from "../../hooks/useDispatch";

export default function AllRunsPanel(props: { className?: string }) {
  const { isFetching, runs } = useSafeSelector((state) => ({
    isFetching: RunInfoStore.isFetchingRuns(state),
    runs: RunInfoStore.getRuns(state),
  }));

  const dispatch = useSafeDispatch();

  React.useEffect(() => {
    dispatch(fetchRuns());
  }, []);

  function renderRun(run: RunInfo) {
    return (
      <div key={run.id}>
        {run.gameName} - {run.categoryName}
      </div>
    );
  }

  return (
    <Panel name="All Runs" className={props.className}>
      {isFetching ? <Text>Fetching Runs</Text> : <div>All the Runs: {runs.map(renderRun)}</div>}
    </Panel>
  );
}
