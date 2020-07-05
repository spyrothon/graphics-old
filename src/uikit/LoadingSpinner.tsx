import * as React from "react";

import style from "./LoadingSpinner.mod.css";

type LoadingSpinnerProps = {
  color?: string;
};

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  return (
    <div class={style.container}>
      <div class={style.spinner} style={{ "--color": props.color || "white" }}>
        Loading
      </div>
    </div>
  );
};

export default LoadingSpinner;
