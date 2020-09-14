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
};

/* eslint-disable camelcase */
export type ServerRunInfo = {
  id: string;
  game_name: string;
  category_name: string;
  estimated_time: number;
  platform: string;
  release_year: string;
  notes?: string;
  actual_time?: number;
  finished: boolean;
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
  });
}
