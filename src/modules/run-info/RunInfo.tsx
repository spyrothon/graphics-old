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
  estimatedTime: number;
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
  estimated_time: number;
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
    estimatedTime: data.estimatedTime ?? 0,
    platform: data.platform ?? "",
    releaseYear: data.releaseYear ?? "",
    finished: data.finished ?? false,
    runners: data.runners ?? [],
    commentators: data.commentators ?? [],
  };
}

export function fromServer(data: ServerRunInfo) {
  return createRunInfo({
    gameName: data.game_name,
    categoryName: data.category_name,
    estimatedTime: data.estimated_time,
    platform: data.platform,
    releaseYear: data.release_year,
    notes: data.notes,
    actualTime: data.actual_time,
    finished: data.finished,
    runners: castParticipants(data.runners),
    commentators: castParticipants(data.commentators),
  });
}

function castParticipants(participants?: ServerRunParticipant[]): RunParticipant[] {
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
