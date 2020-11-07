import * as React from "react";
import classNames from "classnames";

import type { Run } from "../../../api/APITypes";

import useSafeDispatch from "../../hooks/useDispatch";
import Button from "../../uikit/Button";
import Header from "../../uikit/Header";
import DurationInput from "../../uikit/DurationInput";
import { persistRun } from "../runs/RunActions";
import { updateScheduleEntry } from "../schedules/ScheduleActions";
import type { ScheduleEntryWithDependants } from "../schedules/ScheduleTypes";
import DurationUtils from "../time/DurationUtils";

import styles from "./LiveRunActuals.mod.css";

type LiveActualsProps = {
  entry: ScheduleEntryWithDependants;
  run: Run;
  className?: string;
};

export default function LiveRunActuals(props: LiveActualsProps) {
  const { entry, run, className } = props;
  const dispatch = useSafeDispatch();

  const [actualSetup, setActualSetup] = React.useState(entry.setupSeconds);
  const [actualTime, setActualTime] = React.useState(run.actualSeconds);
  const [runnerActuals, setRunnerActuals] = React.useState(() => {
    const actuals: { [name: string]: number | undefined } = {};
    for (const runner of run.runners) {
      actuals[runner.displayName] = runner.actualSeconds;
    }
    return actuals;
  });

  React.useEffect(() => {
    setActualSetup(entry.setupSeconds);
    setActualTime(entry.run?.actualSeconds);
  }, [entry]);

  function setParticipantActual(displayName: string, time: number) {
    setRunnerActuals((state) => ({ ...state, [displayName]: time }));
  }

  function handleSave() {
    dispatch(updateScheduleEntry({ ...entry, setupSeconds: actualSetup }));
    dispatch(
      persistRun({
        ...run,
        actualSeconds: actualTime,
        runners: run.runners.map((runner) => ({
          ...runner,
          actualSeconds: runnerActuals[runner.displayName] ?? runner.actualSeconds,
        })),
      }),
    );
  }

  return (
    <div className={classNames(styles.container, className)}>
      <Header size={Header.Sizes.H4}>Actuals</Header>
      <div className={styles.inputs}>
        <div className={styles.overall}>
          <Header size={Header.Sizes.H5}>Overall</Header>
          <DurationInput
            label="Actual Setup Time"
            value={actualSetup}
            note={
              entry?.setupSeconds != null
                ? `Estimate was ${DurationUtils.toString(entry?.setupSeconds)}`
                : "No estimated setup time was given"
            }
            onChange={setActualSetup}
          />
          <DurationInput
            label="Actual Total Time"
            value={actualTime}
            note={
              entry?.run?.estimateSeconds != null
                ? `Estimate was ${DurationUtils.toString(entry?.run.estimateSeconds)}`
                : "No estimated run time was given"
            }
            onChange={setActualTime}
          />
        </div>

        <div className={styles.participants}>
          <Header size={Header.Sizes.H5}>Runner Times</Header>
          {run.runners.map((runner) => (
            <DurationInput
              key={runner.displayName}
              label={runner.displayName}
              value={runnerActuals[runner.displayName]}
              onChange={(time) => setParticipantActual(runner.displayName, time)}
            />
          ))}
        </div>
      </div>

      <Button onClick={handleSave}>Save Actuals</Button>
    </div>
  );
}
