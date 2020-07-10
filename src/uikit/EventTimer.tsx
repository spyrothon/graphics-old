import * as React from "react";
import classNames from "classnames";

import { useSafeSelector } from "../Store";
import { runTime } from "../Util";
import * as EventStore from "../modules/events/EventStore";

import { EVENT_ID } from "../Constants";
import style from "./EventTimer.mod.css";

type EventTimerProps = {
  eventId?: string;
  className?: string;
};

export default function EventTimer(props: EventTimerProps) {
  const { eventId = EVENT_ID, className } = props;

  const eventTimeSeconds = useSafeSelector((state) =>
    EventStore.getEventTimeSeconds(state, { eventId }),
  );

  return (
    <div className={classNames(className)}>
      <p className={style.eventTimer}>{runTime(eventTimeSeconds)}</p>
    </div>
  );
}
