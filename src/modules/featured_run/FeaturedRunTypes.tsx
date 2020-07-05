export type FeaturedRun = {
  runId?: string;
  rotateAt?: string;
  // Evenly split feature time within an hour across the 7 teams
  // This can be overwritten by the admin dashboard.
  rotationInterval: number;
  // `true` when the stream should automatically rotate to the next
  // stream when `rotateAt` is reached. `false` if it should stay
  // on the current run.
  rotationEnabled: boolean;
};

export enum FeaturedRunActionTypes {
  SET_FEATURED_RUN = "SET_FEATURED_RUN",
  SET_FEATURED_RUN_ROTATION_INTERVAL = "SET_FEATURED_RUN_ROTATION_INTERVAL",
  SET_FEATURED_RUN_ROTATION_ENABLED = "SET_FEATURED_RUN_ROTATION_ENABLED",
}

export type FeaturedRunAction =
  | { type: "SET_FEATURED_RUN"; data: { runId: string; rotateAt?: string } }
  | { type: "SET_FEATURED_RUN_ROTATION_INTERVAL"; data: { rotationInterval: number } }
  | { type: "SET_FEATURED_RUN_ROTATION_ENABLED"; data: { rotationEnabled: boolean } };
