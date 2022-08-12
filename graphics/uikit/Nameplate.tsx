import * as React from "react";
import classNames from "classnames";

import { RunParticipant } from "@api/APITypes";
import DurationUtils from "../modules/time/DurationUtils";

import styles from "./Nameplate.mod.css";

type NameplateProps = {
  participant: RunParticipant;
  className?: string;
};

export default function Nameplate(props: NameplateProps) {
  const { participant, className } = props;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.name}>
        {participant.displayName}
        {participant.pronouns != null ? (
          <span className={styles.pronouns}> {participant.pronouns} </span>
        ) : null}
        {participant.actualSeconds ? (
          <span className={styles.time}>
            {" "}
            &middot; {DurationUtils.toString(participant.actualSeconds)}
          </span>
        ) : null}
      </div>
    </div>
  );
}
