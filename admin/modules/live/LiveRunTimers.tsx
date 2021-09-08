import * as React from "react";
import classNames from "classnames";
import { Pause, RefreshCw, Flag, Play } from "react-feather";

import type { Run } from "../../../api/APITypes";

import useSafeDispatch from "../../hooks/useDispatch";
import Button from "../../uikit/Button";
import Header from "../../uikit/Header";
import Text from "../../uikit/Text";
import getElapsedRunSeconds from "../runs/getElapsedRunSeconds";
import type { ScheduleEntryWithDependants } from "../schedules/ScheduleTypes";
import DurationUtils from "../time/DurationUtils";

import styles from "./LiveRunTimers.mod.css";
import {
  finishRun,
  startRun,
  pauseRun,
  resetRun,
  finishRunParticipant,
  resumeRun,
} from "../runs/RunActions";

type LiveTimerProps = {
  entry: ScheduleEntryWithDependants;
  run: Run;
  className?: string;
};

function getPlayAction(run: Run) {
  if (run.finished || run.pausedAt != null) return resumeRun(run.id);
  if (run.startedAt != null) return undefined;
  return startRun(run.id);
}

function getFinishAction(run: Run) {
  if (run.finished) return undefined;
  if (run.startedAt == null) return undefined;
  return finishRun(run.id);
}

function getPauseAction(run: Run) {
  if (run.finished) return undefined;
  if (run.pausedAt != null) return undefined;
  return pauseRun(run.id);
}

function getResetAction(run: Run) {
  if (run.startedAt == null) return undefined;
  return resetRun(run.id);
}

export default function LiveRunTimers(props: LiveTimerProps) {
  const { run, className } = props;
  const dispatch = useSafeDispatch();

  const playAction = getPlayAction(run);
  const finishAction = getFinishAction(run);
  const pauseAction = getPauseAction(run);
  const resetAction = getResetAction(run);

  return (
    <div className={classNames(styles.container, className)}>
      <Header size={Header.Sizes.H4}>Run Timers</Header>
      <div className={styles.globalTimer}>
        <Text size={Text.Sizes.SIZE_32} marginless>
          {DurationUtils.toString(getElapsedRunSeconds(run))}
        </Text>
        <Button
          icon
          disabled={playAction == null}
          onClick={() => playAction != null && dispatch(playAction)}>
          <Play size={16} />
        </Button>
        <Button
          icon
          disabled={finishAction == null}
          onClick={() => finishAction != null && dispatch(finishAction)}>
          <Flag size={16} strokeWidth="3" />
        </Button>
        <Button
          icon
          disabled={pauseAction == null}
          color={Button.Colors.DEFAULT}
          onClick={() => pauseAction != null && dispatch(pauseAction)}>
          <Pause size={16} />
        </Button>
        <Button
          icon
          disabled={resetAction == null}
          color={Button.Colors.DEFAULT}
          onClick={() => resetAction != null && dispatch(resetAction)}>
          <RefreshCw size={16} />
        </Button>
      </div>
      <table className={styles.timers}>
        <thead>
          <tr>
            <th>Runner</th>
            <th>Current Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {run.runners.map((runner) => (
            <tr key={runner.displayName} className={styles.runnerTimer}>
              <td>
                <Text marginless>{runner.displayName}</Text>
              </td>
              <td>{DurationUtils.toString(getElapsedRunSeconds(run, runner.id))}</td>
              <td width="20">
                <Button icon onClick={() => dispatch(finishRunParticipant(run.id, runner.id))}>
                  <Flag size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
