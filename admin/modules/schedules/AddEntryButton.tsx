import * as React from "react";

import Text from "../../uikit/Text";

import styles from "./ScheduleList.mod.css";

export default function AddEntryButton() {
  return (
    <div className={styles.addButton} onClick={() => null}>
      <Text className={styles.addButtonText}>+ Add a Run</Text>
    </div>
  );
}
