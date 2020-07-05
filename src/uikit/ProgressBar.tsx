import * as React from "react";
import classNames from "classnames";

import style from "./ProgressBar.mod.css";

type ProgressBarProps = {
  progress: number;
  className?: string;
};

const ProgressBar = (props: ProgressBarProps) => {
  const { progress, className } = props;

  return (
    <div className={classNames(style.progressBarContainer, className)}>
      <div
        className={style.progressBar}
        style={{ "--progress": `${progress}%` } as React.CSSProperties}
      />
    </div>
  );
};

export default ProgressBar;
