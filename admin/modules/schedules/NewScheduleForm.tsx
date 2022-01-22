import * as React from "react";

import { InitialSchedule } from "@api/APITypes";
import useSafeDispatch from "@admin/hooks/useDispatch";
import useSaveable from "@common/hooks/useSaveable";
import Button from "@uikit/Button";
import DateTimeInput from "@uikit/DateTimeInput";
import TextInput from "@uikit/TextInput";
import { createSchedule } from "./ScheduleActions";

interface ScheduleFormProps {
  onSave?: () => void;
}

export default function ScheduleForm(props: ScheduleFormProps) {
  const { onSave } = props;
  const dispatch = useSafeDispatch();

  const [editedSchedule, setEditedSchedule] = React.useState<InitialSchedule>({});

  const [handleSave, getSaveText] = useSaveable(async () => {
    await dispatch(createSchedule(editedSchedule));
    onSave?.();
  });

  return (
    <div>
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
      <DateTimeInput
        label="Start Time"
        value={editedSchedule.startTime}
        required
        onChange={(startTime) => setEditedSchedule({ ...editedSchedule, startTime })}
      />
      <DateTimeInput
        label="End Time"
        value={editedSchedule.endTime}
        onChange={(endTime) => setEditedSchedule({ ...editedSchedule, endTime })}
      />
      <TextInput
        label="Twitch URL"
        value={editedSchedule.twitchUrl}
        required
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
