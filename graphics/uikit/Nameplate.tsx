import * as React from "react";
import classNames from "classnames";

import { RunParticipant } from "../../api/APITypes";

import styles from "./Nameplate.mod.css";

type NameplateProps = {
  participant: RunParticipant;
  className?: string;
};

export default function Nameplate(props: NameplateProps) {
  const { participant, className } = props;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.name}>{participant.displayName}</div>
    </div>
  );
}
