import * as React from "react";
import classNames from "classnames";
import { Pause, RefreshCw, Flag, Play } from "react-feather";

import type { Run } from "../../../api/APITypes";

import Button from "../../uikit/Button";
import Header from "../../uikit/Header";
import Text from "../../uikit/Text";
import getElapsedRunSeconds from "../runs/getElapsedRunSeconds";
import type { ScheduleEntryWithDependants } from "../schedules/ScheduleTypes";
import DurationUtils from "../time/DurationUtils";

import styles from "./LiveRunTimers.mod.css";

type LiveTimerProps = {
  entry: ScheduleEntryWithDependants;
  run: Run;
  className?: string;
};

export default function LiveRunTimers(props: LiveTimerProps) {
  const { run, className } = props;
  // const dispatch = useSafeDispatch();

  return (
    <div className={classNames(styles.container, className)}>
      <Header size={Header.Sizes.H4}>Run Timers</Header>
      <div className={styles.globalTimer}>
        <Text size={Text.Sizes.SIZE_32} marginless>
          {DurationUtils.toString(getElapsedRunSeconds(run))}
        </Text>
        <Button icon>
          <Play size={16} />
        </Button>
        <Button icon>
          <Flag size={16} strokeWidth="3" />
        </Button>
        <Button icon color={Button.Colors.DEFAULT}>
          <Pause size={16} />
        </Button>
        <Button icon color={Button.Colors.DEFAULT}>
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
                <Button icon>
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
