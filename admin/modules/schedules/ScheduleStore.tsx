import { createSelector } from "reselect";

import { StoreState } from "../../Store";

const getSchedulesState = (globalState: StoreState) => globalState.schedules;

export const isFetchingSchedule = createSelector([getSchedulesState], (state) => state.fetching);
export const getSchedule = createSelector([getSchedulesState], (state) => state.schedule);
export const getScheduleEntries = createSelector(
  [getSchedulesState],
  (state) => state.schedule?.scheduleEntries ?? [],
);
export const getSelectedEntryId = createSelector(
  [getSchedulesState],
  (state) => state.selectedEntryId,
);
export const getSelectedEntry = createSelector(
  [getScheduleEntries, getSelectedEntryId],
  (entries, selectedId) => entries.find((entry) => entry.id === selectedId),
);
