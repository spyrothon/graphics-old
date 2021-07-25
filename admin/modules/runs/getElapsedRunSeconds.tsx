import type { Run } from "../../../api/APITypes";

export default function getElapsedRunSeconds(
  run: Run,
  runnerId?: string,
  asOf?: Date = new Date(),
) {
  const { actualSeconds, finished, startedAt, finishedAt, pausedAt, pauseSeconds, runners } = run;
  const runner = runners.find((runner) => runner.id === runnerId);

  // Individual runner has already finished, no calculation needed.
  if (runnerId != null && runner?.actualSeconds) return runner.actualSeconds;
  // All remaining times are independent of individual runners.
  // Run is fully completed, no calculation needed.
  if (actualSeconds) return actualSeconds;
  // Run is paused, calculate relative to the most recent pause time.
  if (pausedAt != null) return (pausedAt - startedAt) / 1000 - pauseSeconds;
  // Run is in progress.
  if (startedAt != null) return (asOf - startedAt) / 1000 - pauseSeconds;

  // Run is not started.
  return 0;
}
