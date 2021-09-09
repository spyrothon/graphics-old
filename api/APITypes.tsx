export interface Interview {
  id: string;
  topic: string;
  notes: string;
  estimateSeconds: number;
  interviewees: RunParticipant[];
  interviewers: RunParticipant[];
  questions: InterviewQuestion[];
  currentQuestion?: string;
}

export interface InitialInterview {
  topic?: string;
  notes?: string;
  interviewees?: RunParticipant[];
  interviewers?: RunParticipant[];
}

export interface InterviewQuestion {
  question: string;
  answer?: string;
  category?: string;
  image?: string;
  hint?: string;
  score?: number;
  showQuestion: boolean;
  showHint: boolean;
  showAnswer: boolean;
}

export interface Schedule {
  id: string;
  runTitleTemplate?: string;
  interviewTitleTemplate?: string;
  breakTitleTemplate?: string;
  currentEntryId?: string;
  scheduleEntries: ScheduleEntry[];
  debug: boolean;
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
  startedAt?: Date;
  finishedAt?: Date;
  pausedAt?: Date;
  finished: boolean;
  actualSeconds?: number;
  pauseSeconds?: number;
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
  id: string;
  displayName: string;
  twitchName?: string;
  twitterName?: string;
  hasWebcam: boolean;
  visible: boolean;
  // Run fields
  finishedAt?: Date;
  actualSeconds?: number;
  // Interview fields
  score?: number;
}

export interface OBSWebsocketConfig {
  id: string;
  name: string;
  host: string;
  port: number;
  password: string;
}
