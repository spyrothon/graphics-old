export type RunParticipant = {
  userId: string;
  displayName: string;
  twitchName: string;
  nickname?: string;
};

export type RunInfo = {
  id: string;
  gameName: string;
  categoryName: string;
  estimateSeconds: number;
  platform: string;
  releaseYear: string;
  notes?: string;
  actualTime?: number;
  finished: boolean;
  runners: RunParticipant[];
  commentators: RunParticipant[];
};

/* eslint-disable camelcase */
export type ServerRunInfo = {
  id: number;
  game_name: string;
  category_name: string;
  estimate_seconds: number;
  platform: string;
  release_year: string;
  notes?: string;
  actual_time?: number;
  finished: boolean;
  runners: ServerRunParticipant[];
  commentators: ServerRunParticipant[];
};

export type ServerRunParticipant = {
  user_id: number;
  display_name: string;
  twitch_name: string;
  nickname?: string;
};
/* eslint-enable camelcase */

let infoId = 0;

function newRunInfoId() {
  return `runInfo-${infoId++}`;
}

export function createRunInfo(data: Partial<RunInfo>): RunInfo {
  return {
    id: data.id ?? newRunInfoId(),
    gameName: data.gameName ?? "",
    categoryName: data.categoryName ?? "",
    estimateSeconds: data.estimateSeconds ?? 0,
    platform: data.platform ?? "",
    releaseYear: data.releaseYear ?? "",
    finished: data.finished ?? false,
    runners: data.runners ?? [],
    commentators: data.commentators ?? [],
  };
}

export function fromServer(data: ServerRunInfo) {
  return createRunInfo({
    id: `${data.id}`,
    gameName: data.game_name,
    categoryName: data.category_name,
    estimateSeconds: data.estimate_seconds,
    platform: data.platform,
    releaseYear: data.release_year,
    notes: data.notes,
    actualTime: data.actual_time,
    finished: data.finished,
    runners: participantsFromServer(data.runners),
    commentators: participantsFromServer(data.commentators),
  });
}

export function toServer(data: RunInfo): ServerRunInfo {
  /* eslint-disable camelcase */
  return {
    id: parseInt(data.id),
    game_name: data.gameName,
    category_name: data.categoryName,
    estimate_seconds: data.estimateSeconds,
    platform: data.platform,
    release_year: data.releaseYear,
    notes: data.notes,
    actual_time: data.actualTime,
    finished: data.finished,
    runners: participantsToServer(data.runners),
    commentators: participantsToServer(data.commentators),
  };
  /* eslint-disable camelcase */
}

function participantsFromServer(participants?: ServerRunParticipant[]): RunParticipant[] {
  if (participants == null) return [];

  return participants.map(
    (participant): RunParticipant => ({
      userId: `${participant.user_id}`,
      displayName: participant.display_name,
      twitchName: participant.twitch_name,
      nickname: participant.nickname,
    }),
  );
}

function participantsToServer(participants?: RunParticipant[]): ServerRunParticipant[] {
  if (participants == null) return [];

  return participants.map(
    (participant): ServerRunParticipant => ({
      user_id: parseInt(participant.userId),
      display_name: participant.displayName,
      twitch_name: participant.twitchName,
      nickname: participant.nickname,
    }),
  );
}
