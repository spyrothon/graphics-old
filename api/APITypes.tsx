/* eslint-disable camelcase */

export interface Run {
  id: string;
  gameName: string;
  categoryName: string;
  estimateSeconds: number;
  platform?: string;
  releaseYear?: string;
  notes?: string;
  actualTime?: number;
  finished: boolean;
  runners: RunParticipant[];
  commentators: RunParticipant[];
}

export interface InitialRun {
  gameName: string;
  categoryName: string;
  estimateSeconds: number;
  platform?: string;
  releaseYear?: string;
  notes?: string;
  actualTime?: number;
  finished?: boolean;
  runners?: RunParticipant[];
  commentators?: RunParticipant[];
}

export interface RunParticipant {
  userId: number;
  displayName: string;
  twitchName: string;
  nickname?: string;
}

/* eslint-enable camelcase */
