import * as React from "react";
import classNames from "classnames";

import { Transition } from "../../../api/APITypes";
import Button from "../../uikit/Button";
import Text from "../../uikit/Text";

import styles from "./LiveTransitionSection.mod.css";
import OBS from "../obs/OBS";

interface LiveTransitionSectionProps {
  transitions: Transition[];
  label: string;
  className?: string;
  onFinish: () => void;
}

export default function LiveTransitionSection(props: LiveTransitionSectionProps) {
  const { transitions, label, className, onFinish } = props;

  function handleTransition() {
    OBS.executeTransitionSet(transitions);
  }

  function renderTransitionText(transition: Transition) {
    return (
      <span>
        {transition.obsTransitionInName} to <strong>{transition.obsSceneName}</strong>
        {transition.obsMediaSourceName != null ? (
          <>
            {" - Play "}
            <strong>{transition.obsMediaSourceName}</strong>
          </>
        ) : null}
      </span>
    );
  }

  return (
    <div className={classNames(styles.container, className)}>
      <Button className={styles.transitionButton} onClick={handleTransition}>
        {label}
      </Button>
      <Text marginless>Transition has {transitions.length} parts:</Text>
      {transitions.map((transition) => renderTransitionText(transition))}
    </div>
  );
}
