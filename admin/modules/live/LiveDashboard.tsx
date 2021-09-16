import * as React from "react";

import { useSafeSelector } from "../../Store";
import Dashboard from "../dashboards/Dashboard";
import * as ScheduleStore from "../schedules/ScheduleStore";
import LiveEntryControl from "./LiveEntryControl";
import LiveInterviewInfo from "./LiveInterviewInfo";
import LiveParticipants from "./LiveParticipants";
import LiveRunTimers from "./LiveRunTimers";
import LiveRunInfo from "./LiveRunInfo";
import LiveSidebar from "./LiveSidebar";
import LiveTransitionSection from "./LiveTransitionSection";

import styles from "./LiveDashboard.mod.css";

export default function LiveDashboard() {
  const { currentEntry } = useSafeSelector((state) => ({
    currentEntry: ScheduleStore.getCurrentEntryWithDependants(state),
  }));

  function renderMain() {
    return (
      <div className={styles.main}>
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
      renderSidebar={() => <LiveSidebar className={styles.sidebar} />}
      renderMain={renderMain}
    />
  );
}
