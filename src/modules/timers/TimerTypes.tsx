export enum TimerActionTypes {
  TIMER_TICK = "TIMER_TICK",
}

export type TimerAction = { type: "TIMER_TICK"; data: { currentTime: string } };
