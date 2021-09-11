import * as React from "react";

import APIClient from "../../../api/APIClient";
import { ScheduleResponse } from "../../../api/APITypes";
import useSafeDispatch from "../../hooks/useDispatch";
import useSaveable from "../../hooks/useSaveable";
import Button from "../../uikit/Button";
import Header from "../../uikit/Header";
import SelectInput from "../../uikit/SelectInput";
import CurrentScheduleContext from "../schedules/CurrentScheduleContext";
import NewScheduleForm from "../schedules/NewScheduleForm";
import { setCurrentSchedule } from "../schedules/ScheduleActions";

import styles from "./SettingsDashboard.mod.css";

export default function SettingsGeneral() {
  const dispatch = useSafeDispatch();
  const { schedule: currentSchedule } = React.useContext(CurrentScheduleContext);

  const [schedules, setSchedules] = React.useState<ScheduleResponse[]>([]);
  const [newCurrentSchedule, setSchedule] = React.useState<ScheduleResponse | undefined>();

  React.useEffect(() => {
    APIClient.fetchSchedules().then((data) => {
      setSchedules(data);

      const newSchedule = data.find((schedule) => schedule.id === currentSchedule.id);
      setSchedule(newSchedule);
    });
  }, [currentSchedule]);

  React.useEffect(() => {
    const newSchedule = schedules.find((schedule) => schedule.id === currentSchedule.id);
    setSchedule(newSchedule);
  }, [currentSchedule, schedules]);

  const [handleSave, getSaveText] = useSaveable(async () => {
    if (newCurrentSchedule == null) return;

    // Update and persist current schedule
    dispatch(setCurrentSchedule(newCurrentSchedule));
  });

  return (
    <>
      <div className={styles.section}>
        <Header size={Header.Sizes.H2}>General Settings</Header>

        <SelectInput
          label="Current Schedule"
          items={schedules}
          value={newCurrentSchedule}
          itemToString={(schedule) =>
            `${schedule.name} (${schedule.series} - ${schedule.startTime?.toLocaleDateString()})`
          }
          onChange={(schedule) => (schedule != null ? setCurrentSchedule(schedule) : null)}
        />

        <Button onClick={handleSave}>{getSaveText()}</Button>
      </div>

      <div className={styles.section}>
        <Header size={Header.Sizes.H2}>Create a New Schedule</Header>
        <NewScheduleForm />
      </div>
    </>
  );
}
