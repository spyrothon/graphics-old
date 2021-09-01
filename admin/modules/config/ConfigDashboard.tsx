import * as React from "react";

import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import Button from "../../uikit/Button";
import Dashboard from "../dashboards/Dashboard";
import * as ScheduleStore from "../schedules/ScheduleStore";
import { updateSchedule } from "../schedules/ScheduleActions";
import TextInput from "../../uikit/TextInput";
import { Schedule } from "../../../api/APITypes";
import Header from "../../uikit/Header";
import Text from "../../uikit/Text";

import styles from "./ConfigDashboard.mod.css";

export default function ConfigDashboard() {
  const dispatch = useSafeDispatch();
  const { schedule } = useSafeSelector((state) => ({
    schedule: ScheduleStore.getSchedule(state),
  }));

  const [runTitleTemplate, setRunTemplate] = React.useState(schedule?.runTitleTemplate);
  const [interviewTitleTemplate, setInterviewTemplate] = React.useState(
    schedule?.interviewTitleTemplate,
  );
  const [breakTitleTemplate, setBreakTemplate] = React.useState(schedule?.breakTitleTemplate);

  React.useLayoutEffect(() => {
    setRunTemplate(schedule?.runTitleTemplate);
    setInterviewTemplate(schedule?.interviewTitleTemplate);
    setBreakTemplate(schedule?.breakTitleTemplate);
  }, [schedule]);

  function handleSaveSchedule(schedule: Schedule) {
    dispatch(updateSchedule(schedule));
  }

  function renderMain() {
    if (schedule == null) return null;

    return (
      <div className={styles.main}>
        <Header size={Header.Sizes.H2}>Stream Titles</Header>
        <Text>
          Use these templates to automatically set the Stream Title on Twitch based on the current
          schedule entry.
          <br />
          Interpolate values into the strings with <code>{"{{ value }}"}</code>.
        </Text>
        <TextInput
          label="Run Title Template"
          note="Available values are: gameName, categoryName, runners."
          value={runTitleTemplate}
          onChange={(event) => setRunTemplate(event.target.value)}
          autoFocus
        />
        <TextInput
          label="Interview Title Template"
          note="Available values are: interviewees, interviewers."
          value={interviewTitleTemplate}
          onChange={(event) => setInterviewTemplate(event.target.value)}
          autoFocus
        />
        <TextInput
          label="Break Title Template"
          note="No available interpolations currently."
          value={breakTitleTemplate}
          onChange={(event) => setBreakTemplate(event.target.value)}
          autoFocus
        />
        <Button
          className={styles.setCurrentButton}
          onClick={() =>
            handleSaveSchedule({
              ...schedule,
              runTitleTemplate,
              interviewTitleTemplate,
              breakTitleTemplate,
            })
          }>
          Save
        </Button>
      </div>
    );
  }

  return <Dashboard fullPage renderSidebar={() => null} renderMain={renderMain} />;
}
