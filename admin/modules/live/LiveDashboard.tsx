import * as React from "react";

import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import Button from "../../uikit/Button";
import Dashboard from "../dashboards/Dashboard";
import * as ScheduleStore from "../schedules/ScheduleStore";
import { transitionToSecheduleEntry } from "../schedules/ScheduleActions";
import LiveEntryControl from "./LiveEntryControl";
import LiveInterviewInfo from "./LiveInterviewInfo";
import LiveParticipants from "./LiveParticipants";
import LiveRunTimers from "./LiveRunTimers";
import LiveRunInfo from "./LiveRunInfo";
import LiveOnNow from "./LiveOnNow";
import LiveTransitionSection from "./LiveTransitionSection";

import styles from "./LiveDashboard.mod.css";

export default function LiveDashboard() {
  const dispatch = useSafeDispatch();
  const { schedule, currentEntry, nextEntry, prevEntry } = useSafeSelector((state) => ({
    schedule: ScheduleStore.getSchedule(state),
    currentEntry: ScheduleStore.getCurrentEntryWithDependants(state),
    nextEntry: ScheduleStore.getNextEntryWithDependants(state),
    prevEntry: ScheduleStore.getPreviousEntryWithDependants(state),
  }));

  function handleTransitionPrevious() {
    if (schedule == null || prevEntry == null) return;

    dispatch(transitionToSecheduleEntry(schedule.id, prevEntry.id));
  }

  function handleTransitionNext() {
    if (schedule == null || nextEntry == null) return;

    dispatch(transitionToSecheduleEntry(schedule.id, nextEntry.id));
  }

  function renderMain() {
    return (
      <div className={styles.main}>
        <Button onClick={handleTransitionPrevious} disabled={prevEntry == null}>
          Go to Previous Entry
        </Button>
        <Button onClick={handleTransitionNext} disabled={nextEntry == null}>
          Go to Next Entry
        </Button>
        {currentEntry?.run != null ? (
          <div className={styles.panels}>
            <LiveEntryControl className={styles.panel} />
            <LiveTransitionSection
              className={styles.transitionPanel}
              transitionSet={currentEntry.enterTransitionSet}
              label="Transition into Content"
              onFinish={() => null}
            />
            <LiveRunInfo className={styles.panel} entry={currentEntry} run={currentEntry.run} />
            <LiveRunTimers className={styles.panel} run={currentEntry.run} />
            <LiveParticipants className={styles.panel} run={currentEntry.run} />
            <LiveTransitionSection
              className={styles.transitionPanel}
              transitionSet={currentEntry.exitTransitionSet}
              label="Transition to Break"
              onFinish={() => null}
            />
          </div>
        ) : null}

        {currentEntry?.interviewId != null ? (
          <div className={styles.panels}>
            <LiveInterviewInfo interviewId={currentEntry.interviewId} />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <Dashboard
      fullPage
      renderSidebar={() => <LiveOnNow className={styles.sidebar} />}
      renderMain={renderMain}
    />
  );
}
