import * as React from "react";
import classNames from "classnames";

import styles from "./GameFeedArea.mod.css";

type GameFeedAreaProps = {
  className: string;
};

export default function GameFeedArea(props: GameFeedAreaProps) {
  return <div className={classNames(styles.feed, props.className)} />;
}
