import * as React from "react";

import APIClient from "@api/APIClient";
import { ScheduleResponse } from "@api/APITypes";
import useSafeDispatch from "@admin/hooks/useDispatch";
import Header from "@uikit/Header";
import CurrentScheduleContext from "../schedules/CurrentScheduleContext";
import { setCurrentSchedule } from "../schedules/ScheduleActions";
import ScheduleCard from "../schedules/ScheduleCard";

import styles from "./SettingsGeneral.mod.css";

export default function SettingsGeneral() {
  const dispatch = useSafeDispatch();
  const { schedule: currentSchedule } = React.useContext(CurrentScheduleContext);

  const [schedules, setSchedules] = React.useState<ScheduleResponse[]>([]);

  React.useEffect(() => {
    APIClient.fetchSchedules().then((data) => setSchedules(data));
  }, [currentSchedule]);

  return (
    <div className={styles.section}>
      <Header size={Header.Sizes.H2}>Select a Schedule</Header>

      {schedules.map((schedule) => (
        <ScheduleCard
          className={styles.scheduleCard}
          key={schedule.id}
          schedule={schedule}
          onSelect={() => dispatch(setCurrentSchedule(schedule))}
        />
      ))}
    </div>
  );
}
