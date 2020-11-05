export interface Interview {
  id: string;
  topic: string;
  notes: string;
  estimateSeconds: number;
  interviewees: RunParticipant[];
  interviewers: RunParticipant[];
}

export interface InitialInterview {
  topic?: string;
  notes?: string;
  interviewees?: RunParticipant[];
  interviewers?: RunParticipant[];
}

export interface Schedule {
  id: string;
  currentEntryId?: string;
  scheduleEntries: ScheduleEntry[];
}

export interface ScheduleResponse extends Schedule {
  runs: Run[];
  interviews: Interview[];
}

export interface ScheduleEntry {
  id: string;
  scheduleId: string;
  position: number;
  setupSeconds?: number;
  runId?: string;
  interviewId?: string;
}

export interface InitialScheduleEntry {
  position?: number;
  setupSeconds?: number;
  runId?: string;
  interviewId?: string;
}

export interface Run {
  id: string;
  gameName?: string;
  gameNameFormatted?: string;
  categoryName?: string;
  estimateSeconds: number;
  platform?: string;
  releaseYear?: string;
  notes?: string;
  actualSeconds?: number;
  finished: boolean;
  runners: RunParticipant[];
  commentators: RunParticipant[];
}

export interface InitialRun {
  gameName?: string;
  categoryName?: string;
  estimateSeconds?: number;
  platform?: string;
  releaseYear?: string;
  notes?: string;
  actualTime?: number;
  finished?: boolean;
  runners?: RunParticipant[];
  commentators?: RunParticipant[];
}

export interface RunParticipant {
  displayName: string;
  twitchName?: string;
  twitterName?: string;
  actualSeconds?: number;
  visible: boolean;
}
