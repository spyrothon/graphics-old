import { DateTime } from "luxon";
import { createSelector } from "reselect";

import { StoreState } from "../../Store";
import { getInterviewsById } from "../interviews/InterviewStore";
import { getRunsById } from "../runs/RunStore";
import type { ScheduleEntryWithTimes } from "./ScheduleTypes";

const getSchedulesState = (globalState: StoreState) => globalState.schedules;

export const isFetchingSchedule = createSelector([getSchedulesState], (state) => state.fetching);

export const getScheduleStartTime = createSelector([], () =>
  DateTime.fromISO("2020-11-06T23:30:00Z"),
);

export const getSchedule = createSelector([getSchedulesState], (state) => state.schedule);
export const getScheduleEntries = createSelector(
  [getSchedulesState],
  (state) => state.schedule?.scheduleEntries ?? [],
);

export const getCurrentEntryId = createSelector(
  [getSchedulesState],
  (state) => state.schedule?.currentEntryId,
);
export const getCurrentEntry = createSelector(
  [getScheduleEntries, getCurrentEntryId],
  (entries, entryId) => entries.find((entry) => entry.id === entryId),
);

export const getSelectedEntryId = createSelector(
  [getSchedulesState],
  (state) => state.selectedEntryId,
);
export const getSelectedEntry = createSelector(
  [getScheduleEntries, getSelectedEntryId],
  (entries, selectedId) => entries.find((entry) => entry.id === selectedId),
);

export const getEntriesWithStartTimes = createSelector(
  [getScheduleStartTime, getScheduleEntries, getRunsById, getInterviewsById],
  (scheduleStartTime, entries, runs, interviews) => {
    const scheduleStart = scheduleStartTime;

    let lastActualStartTime = scheduleStart;
    let lastEstimatedStartTime = scheduleStart;

    return entries.map(
      (entry): ScheduleEntryWithTimes => {
        let nextActualStartTime = lastActualStartTime.plus({ seconds: entry.setupSeconds ?? 0 });
        let nextEstimatedStartTime = lastEstimatedStartTime.plus({
          seconds: entry.setupSeconds ?? 0,
        });

        if (entry.runId != null) {
          const run = runs[entry.runId];
          if (run != null) {
            lastActualStartTime = nextActualStartTime.plus({
              seconds: run.actualTime ?? run.estimateSeconds,
            });
            lastEstimatedStartTime = nextEstimatedStartTime.plus({ seconds: run.estimateSeconds });
          }
        }
        if (entry.interviewId != null) {
          const interview = interviews[entry.interviewId];
          if (interview != null) {
            lastActualStartTime = nextActualStartTime.plus({ seconds: interview.estimateSeconds });
            lastEstimatedStartTime = nextEstimatedStartTime.plus({
              seconds: interview.estimateSeconds,
            });
          }
        }

        return {
          ...entry,
          actualStartTime: nextActualStartTime,
          estimatedStartTime: nextEstimatedStartTime,
        };
      },
    );
  },
);