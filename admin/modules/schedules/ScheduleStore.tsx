import { DateTime } from "luxon";
import { createSelector } from "reselect";

import { StoreState } from "../../Store";
import { getInterviewsById } from "../interviews/InterviewStore";
import { getRunsById } from "../runs/RunStore";
import type { ScheduleEntryWithDependants, ScheduleEntryWithTimes } from "./ScheduleTypes";

const getSchedulesState = (globalState: StoreState) => globalState.schedules;
export const getSchedule = (state: StoreState) => getSchedulesState(state).schedule;
export const getOBSConfig = (state: StoreState) => getSchedulesState(state).obsConfig;

export const isFetchingSchedule = createSelector([getSchedulesState], (state) => state.fetching);
export const isDebug = createSelector([getSchedule], (schedule) => schedule?.debug);

export const getScheduleStartTime = createSelector([getSchedule], (schedule) =>
  DateTime.fromJSDate(schedule!.startTime),
);

export const getScheduleEntries = createSelector(
  [getSchedulesState],
  (state) => state.schedule?.scheduleEntries ?? [],
);

export const getScheduleEntriesWithDependants = createSelector(
  [getScheduleEntries, getRunsById, getInterviewsById],
  (entries, runs, interviews) => {
    return entries.map(
      (entry): ScheduleEntryWithDependants => {
        return {
          ...entry,
          run: entry.runId != null ? runs[entry.runId] : undefined,
          interview: entry.interviewId != null ? interviews[entry.interviewId] : undefined,
        };
      },
    );
  },
);

export const getCurrentEntryId = (state: StoreState) => getSchedule(state)?.currentEntryId;

export const getCurrentEntry = createSelector(
  [getScheduleEntries, getCurrentEntryId],
  (entries, entryId) => entries.find((entry) => entry.id === entryId),
);

export const getCurrentEntryWithDependants = createSelector(
  [getScheduleEntriesWithDependants, getCurrentEntryId],
  (entries, entryId) => entries.find((entry) => entry.id === entryId),
);

export const getPreviousEntryWithDependants = createSelector(
  [getScheduleEntriesWithDependants, getCurrentEntryId],
  (entries, entryId) => {
    const index = entries.findIndex((entry) => entry.id === entryId);
    return index < 0 ? undefined : entries[index - 1];
  },
);

export const getNextEntryWithDependants = createSelector(
  [getScheduleEntriesWithDependants, getCurrentEntryId],
  (entries, entryId) => {
    const index = entries.findIndex((entry) => entry.id === entryId);
    return index < 0 ? undefined : entries[index + 1];
  },
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
        const nextActualStartTime = lastActualStartTime.plus({ seconds: entry.setupSeconds ?? 0 });
        const nextEstimatedStartTime = lastEstimatedStartTime.plus({
          seconds: entry.setupSeconds ?? 0,
        });

        if (entry.runId != null) {
          const run = runs[entry.runId];
          if (run != null) {
            lastActualStartTime = nextActualStartTime.plus({
              seconds: run.actualSeconds ?? run.estimateSeconds,
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
