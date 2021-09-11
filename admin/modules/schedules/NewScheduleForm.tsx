import * as React from "react";

import { InitialSchedule } from "../../../api/APITypes";
import useSafeDispatch from "../../hooks/useDispatch";
import useSaveable from "../../hooks/useSaveable";
import Button from "../../uikit/Button";
import TextInput from "../../uikit/TextInput";
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
      <TextInput
        label="Start Time"
        value={editedSchedule.startTime?.toISOString()}
        required
        onChange={(event) =>
          setEditedSchedule({
            ...editedSchedule,
            startTime: new Date(event.target.value),
          })
        }
      />
      <TextInput
        label="End Time"
        value={editedSchedule.endTime?.toISOString()}
        required
        onChange={(event) =>
          setEditedSchedule({
            ...editedSchedule,
            endTime: new Date(event.target.value),
          })
        }
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
