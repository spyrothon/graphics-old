import * as React from "react";

import style from "./LoadingSpinner.mod.css";

type LoadingSpinnerProps = {
  color?: string;
};

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  return (
    <div className={style.container}>
      <div
        className={style.spinner}
        style={{ "--color": props.color || "white" } as React.CSSProperties}>
        Loading
      </div>
    </div>
  );
};

export default LoadingSpinner;
