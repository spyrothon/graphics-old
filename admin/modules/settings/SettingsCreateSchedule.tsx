import * as React from "react";

import { InitialSchedule } from "@api/APITypes";
import useSafeDispatch from "@admin/hooks/useDispatch";
import useSaveable from "@common/hooks/useSaveable";
import Header from "@uikit/Header";
import Button from "@uikit/Button";
import DateTimeInput from "@uikit/DateTimeInput";
import TextInput from "@uikit/TextInput";
import { createSchedule } from "../schedules/ScheduleActions";

import styles from "./SettingsCreateSchedule.mod.css";

export default function SettingsGeneral() {
  const dispatch = useSafeDispatch();

  const [editedSchedule, setEditedSchedule] = React.useState<InitialSchedule>({});
  const [handleSave, getSaveText] = useSaveable(async () => {
    await dispatch(createSchedule(editedSchedule));
  });

  return (
    <div>
      <Header size={Header.Sizes.H2}>Create a New Schedule</Header>
      <TextInput
        label="Event Name"
        value={editedSchedule.name}
        required
        onChange={(event) => setEditedSchedule({ ...editedSchedule, name: event.target.value })}
      />
      <TextInput
        label="Event Series"
        value={editedSchedule.series}
        required
        onChange={(event) => setEditedSchedule({ ...editedSchedule, series: event.target.value })}
      />
      <div className={styles.dates}>
        <DateTimeInput
          className={styles.date}
          label="Start Time"
          required
          value={editedSchedule.startTime}
          onChange={(startTime) => setEditedSchedule({ ...editedSchedule, startTime })}
        />
        <DateTimeInput
          className={styles.date}
          label="End Time"
          value={editedSchedule.endTime}
          onChange={(endTime) => setEditedSchedule({ ...editedSchedule, endTime })}
        />
      </div>
      <TextInput
        label="Twitch URL"
        value={editedSchedule.twitchUrl}
        onChange={(event) =>
          setEditedSchedule({ ...editedSchedule, twitchUrl: event.target.value })
        }
      />
      <TextInput
        label="Logo URL"
        value={editedSchedule.logoUrl}
        onChange={(event) => setEditedSchedule({ ...editedSchedule, logoUrl: event.target.value })}
      />

      <Button onClick={handleSave}>{getSaveText()}</Button>
    </div>
  );
}
