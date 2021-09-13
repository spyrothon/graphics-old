import * as React from "react";
import classNames from "classnames";
import { Pause, Repeat, Flag, Play, Icon } from "react-feather";

import type { Run, RunParticipant } from "../../../api/APITypes";
import useSafeDispatch, { SafeDispatch } from "../../hooks/useDispatch";
import Button from "../../uikit/Button";
import Header from "../../uikit/Header";
import Text from "../../uikit/Text";
import type { ScheduleEntryWithDependants } from "../schedules/ScheduleTypes";
import LiveTimer from "../time/LiveTimer";

import styles from "./LiveRunTimers.mod.css";
import {
  finishRun,
  startRun,
  pauseRun,
  resetRun,
  finishRunParticipant,
  resumeRun,
  resumeRunParticipant,
} from "../runs/RunActions";
import getRunState from "../runs/getRunState";

interface TimerAction {
  Icon: Icon;
  action: (dispatch: SafeDispatch) => void;
  disabled?: boolean;
  color?: typeof Button.Colors[keyof typeof Button.Colors];
  strokeWidth?: string;
  label?: string;
}

function getPlayAction(run: Run): TimerAction | undefined {
  if ((run.runners.length <= 1 && run.finished) || run.pausedAt != null) {
    return {
      Icon: Play,
      action(dispatch) {
        dispatch(resumeRun(run.id));
      },
    };
  }

  if (run.startedAt != null) return undefined;

  return {
    Icon: Play,
    action(dispatch) {
      dispatch(startRun(run.id));
    },
  };
}

function getFinishAction(run: Run): TimerAction | undefined {
  if (run.finished) return undefined;
  if (run.runners.length > 1) return undefined;
  if (run.startedAt == null) return undefined;

  return {
    Icon: Flag,
    action(dispatch) {
      dispatch(finishRun(run.id));
    },
  };
}

function getPauseAction(run: Run): TimerAction | undefined {
  if (run.startedAt == null) return undefined;
  if (run.finished) return undefined;
  if (run.pausedAt != null) return undefined;

  return {
    Icon: Pause,
    color: Button.Colors.DEFAULT,
    strokeWidth: "2",
    action(dispatch) {
      dispatch(pauseRun(run.id));
    },
  };
}

function getResetAction(run: Run): TimerAction | undefined {
  if (run.startedAt == null) return undefined;
  return {
    Icon: Repeat,
    color: Button.Colors.DEFAULT,
    action(dispatch) {
      dispatch(resetRun(run.id));
    },
  };
}

function getParticipantAction(run: Run, runner: RunParticipant): TimerAction {
  const allDisabled = run.startedAt == null || run.pausedAt != null;

  if (runner.finishedAt != null) {
    return {
      Icon: Play,
      disabled: allDisabled,
      action(dispatch) {
        dispatch(resumeRunParticipant(run.id, runner.id));
      },
    };
  }

  return {
    Icon: Flag,
    disabled: allDisabled,
    action(dispatch) {
      dispatch(finishRunParticipant(run.id, runner.id));
    },
  };
}

interface ActionButtonProps {
  action?: TimerAction;
}

function ActionButton(props: ActionButtonProps) {
  const dispatch = useSafeDispatch();
  if (props.action == null) return null;

  const {
    Icon,
    action,
    color = Button.Colors.PRIMARY,
    disabled = false,
    strokeWidth = "3",
  } = props.action;

  return (
    <Button icon onClick={() => action(dispatch)} color={color} disabled={disabled}>
      <Icon size={16} strokeWidth={strokeWidth} />
    </Button>
  );
}

interface LiveTimerProps {
  run: Run;
  className?: string;
}

export default function LiveRunTimers(props: LiveTimerProps) {
  const { run, className } = props;

  const runnersTable =
    run.runners.length <= 1 ? null : (
      <table className={styles.runners}>
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
              <td
                className={classNames(styles.timer, {
                  [styles.inProgress]: runner.finishedAt == null,
                })}>
                <LiveTimer run={run} runnerId={runner.id} />
              </td>
              <td width="20">
                <ActionButton action={getParticipantAction(run, runner)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <div className={classNames(styles.container, className)}>
      <Header size={Header.Sizes.H4}>Run Timer</Header>
      <div className={styles.globalTimer}>
        <div>
          <Text className={styles.timer} size={Text.Sizes.SIZE_32} marginless>
            <LiveTimer run={run} />
          </Text>
          <Text size={Text.Sizes.SIZE_14} marginless>
            {getRunState(run)}
          </Text>
        </div>
        <ActionButton action={getFinishAction(run)} />
        <ActionButton action={getPlayAction(run)} />
        <ActionButton action={getPauseAction(run)} />
        <ActionButton action={getResetAction(run)} />
      </div>
      {runnersTable}
    </div>
  );
}
