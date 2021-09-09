import * as React from "react";

import useSafeDispatch from "../../hooks/useDispatch";
import Button from "../../uikit/Button";
import { fetchScheduleOBSConfig, updateScheduleOBSConfig } from "../schedules/ScheduleActions";
import TextInput from "../../uikit/TextInput";
import NumberInput from "../../uikit/NumberInput";
import Header from "../../uikit/Header";
import Text from "../../uikit/Text";
import { useSafeSelector } from "../../Store";
import * as ScheduleStore from "../schedules/ScheduleStore";

import styles from "./ConfigDashboard.mod.css";
import type { Schedule } from "../../../api/APITypes";

type ConfigOBSHostProps = {
  schedule: Schedule | undefined;
};

export default function ConfigOBSHost(props: ConfigOBSHostProps) {
  const { schedule } = props;
  const dispatch = useSafeDispatch();

  React.useEffect(() => {
    if (schedule?.id == null) return;
    fetchScheduleOBSConfig(schedule.id);
  }, [schedule?.id]);

  const obsConfig = useSafeSelector(ScheduleStore.getOBSConfig);
  const [host, setHost] = React.useState(obsConfig?.host || "");
  const [port, setPort] = React.useState(obsConfig?.port || 4000);
  const [password, setPassword] = React.useState(obsConfig?.password || "");
  React.useEffect(() => {
    if (obsConfig == null) return;

    setHost(obsConfig.host);
    setPort(obsConfig.port);
    setPassword(obsConfig.password);
  }, [obsConfig]);

  if (schedule == null || obsConfig == null) return null;

  return (
    <div className={styles.section}>
      <Header size={Header.Sizes.H2}>OBS Websocket Host</Header>
      <Text>
        This information is used to connect to the OBS instance running graphics for the stream.
      </Text>
      <TextInput
        label="Host"
        note="EX: localhost, eventwebsite.org. Do not include a protocol or port number here"
        value={host}
        onChange={(event) => setHost(event.target.value)}
      />
      <NumberInput
        label="Port"
        note="Must be a valid port number [0-65535]."
        value={port}
        onChange={(event) => setPort(Number(event.target.value))}
        autoFocus
      />
      <TextInput
        label="Password"
        note="Use a password to prevent random people from connecting to OBS."
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoFocus
      />
      <Button
        className={styles.setCurrentButton}
        onClick={() =>
          dispatch(updateScheduleOBSConfig(schedule.id, { ...obsConfig, host, port, password }))
        }>
        Save
      </Button>
    </div>
  );
}
