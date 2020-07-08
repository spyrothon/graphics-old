import queryString from "query-string";

const { api_base: queryAPIBase } = queryString.parse(window.location.search);

export const API_BASE_URL = queryAPIBase || process.env.API_ENDPOINT;
export const ASSETS_URL = process.env.ASSETS_ENDPOINT;

export const EVENT_ID = "24";

export const Colors = {
  TWITCH: "#6441A4",
};

export const RunUpdateTypes = {
  STARTED: "run_started",
  FINISHED: "run_finished",
  RESUMED: "run_resumed",
  RESET: "run_reset",
} as const;

export const ADMIN_SESSION_COOKIE_NAME = "1545_session_id";

export enum CollectionType {
  ACCOUNTS = "accounts",
  EVENT = "event",
  GAMES = "games",
  RUNS = "runs",
  TEAMS = "teams",
}

export const EventStates = {
  READY: "ready",
  STARTED: "started",
  PAUSED: "paused",
  FINISHED: "finished",
};
