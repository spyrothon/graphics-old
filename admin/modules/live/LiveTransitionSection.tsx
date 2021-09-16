import * as React from "react";
import classNames from "classnames";
import { Loader, Check, Circle } from "react-feather";

import { Transition, TransitionSet, TransitionState } from "../../../api/APITypes";
import useSafeDispatch from "../../hooks/useDispatch";
import Button from "../../uikit/Button";
import Text from "../../uikit/Text";
import OBS from "../obs/OBS";
import { resetTransitionSet } from "../schedules/ScheduleActions";

import styles from "./LiveTransitionSection.mod.css";

function getIconForTransitionState(state?: TransitionState) {
  switch (state) {
    case TransitionState.DONE:
      return Check;
    case TransitionState.IN_PROGRESS:
      return Loader;
    default:
      return Circle;
  }
}

interface LiveTransitionSectionProps {
  transitionSet?: TransitionSet;
  label: string;
  className?: string;
  onFinish: () => void;
}

export default function LiveTransitionSection(props: LiveTransitionSectionProps) {
  const dispatch = useSafeDispatch();
  const { transitionSet, label, className, onFinish } = props;

  function renderTransitionText(transition: Transition) {
    const Icon = getIconForTransitionState(transition.state);
    return (
      <div className={styles.transition} key={transition.id}>
        {Icon != null ? (
          <Icon className={styles.transitionIcon} size={16} strokeWidth="3" />
        ) : (
          <div className={styles.transitionIcon} />
        )}
        <Text marginless>
          {transition.obsTransitionInName} to <strong>{transition.obsSceneName}</strong>
          {transition.obsMediaSourceName != null ? (
            <>
              {" - Play "}
              <strong>{transition.obsMediaSourceName}</strong>
            </>
          ) : null}
        </Text>
      </div>
    );
  }

  if (transitionSet == null) {
    return (
      <div className={classNames(styles.container, className)}>
        <Text className={styles.empty} color={Text.Colors.MUTED}>
          No Transitions Specified
        </Text>
      </div>
    );
  }

  const { transitions } = transitionSet;
  const completed = transitions.every((transition) => transition.state === TransitionState.DONE);
  const inProgress = transitions.some(
    (transition) => transition.state === TransitionState.IN_PROGRESS,
  );

  return (
    <div className={classNames(styles.container, className, { [styles.completed]: completed })}>
      <div className={styles.readout}>
        <Text>{inProgress ? "Sequence (in progress):" : "Sequence:"}</Text>
        {transitions.map((transition) => renderTransitionText(transition))}
      </div>
      <div className={styles.info}>
        <Button
          className={styles.transitionButton}
          disabled={inProgress || completed}
          onClick={() => OBS.executeTransitionSet(transitionSet)}>
          {label}
        </Button>
        {inProgress || completed ? (
          <Button
            className={styles.resetButton}
            onClick={() => dispatch(resetTransitionSet(transitionSet))}
            size={Button.Sizes.SMALL}>
            Reset
          </Button>
        ) : null}
      </div>
    </div>
  );
}
