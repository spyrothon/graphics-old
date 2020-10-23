import * as React from "react";

import Text from "../../uikit/Text";

import styles from "./RunList.mod.css";

type AddRunButtonProps = {
  onClick: () => unknown;
};

export default function AddRunButton(props: AddRunButtonProps) {
  const { onClick } = props;

  return (
    <div className={styles.runButton} onClick={onClick}>
      <Text className={styles.runButtonText}>+ Add a Run</Text>
    </div>
  );
}
