import * as React from "react";
import classNames from "classnames";

import { Transition, TransitionSet, TransitionState } from "../../../api/APITypes";
import Button from "../../uikit/Button";
import Text from "../../uikit/Text";

import styles from "./LiveTransitionSection.mod.css";
import OBS from "../obs/OBS";
import { Loader, Check, Circle } from "react-feather";

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
        <Text>No Transitions Specified</Text>
      </div>
    );
  }

  const { transitions } = transitionSet;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.readout}>
        <Text>Sequence:</Text>
        {transitions.map((transition) => renderTransitionText(transition))}
      </div>
      <div className={styles.info}>
        <Button
          className={styles.transitionButton}
          onClick={() => OBS.executeTransitionSet(transitionSet)}>
          {label}
        </Button>
      </div>
    </div>
  );
}
