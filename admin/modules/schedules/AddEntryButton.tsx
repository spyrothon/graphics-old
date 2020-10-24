import * as React from "react";

import useSafeDispatch from "../../hooks/useDispatch";
import Text from "../../uikit/Text";
import { addRunToSchedule, addInterviewToSchedule } from "./ScheduleActions";

import styles from "./ScheduleList.mod.css";

type AddEntryButtonsProps = {
  scheduleId: string;
};

export default function AddEntryButtons(props: AddEntryButtonsProps) {
  const { scheduleId } = props;
  const dispatch = useSafeDispatch();

  async function handleAddRun() {
    await dispatch(addRunToSchedule(scheduleId));
  }

  async function handleAddInterview() {
    await dispatch(addInterviewToSchedule(scheduleId));
  }

  return (
    <div className={styles.addButtons}>
      <div className={styles.addButton} onClick={handleAddRun}>
        <Text className={styles.addButtonText}>+ Add a Run</Text>
      </div>
      <div className={styles.addButton} onClick={handleAddInterview}>
        <Text className={styles.addButtonText}>+ Add an Interview</Text>
      </div>
    </div>
  );
}
