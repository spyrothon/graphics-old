import * as React from "react";
import DurationUtils from "../../admin/modules/time/DurationUtils";
import { DateTime } from "luxon";

type LiveTimerProps = {
  startTime: DateTime;
  className?: string;
};

export default function LiveTimer(props: LiveTimerProps) {
  const { startTime, className } = props;

  const [, setVersion] = React.useState(0);

  React.useEffect(() => {
    function update() {
      setVersion((v) => v + 1);
      requestAnimationFrame(update);
    }

    const rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const diff = Math.max(Math.floor(startTime.toSeconds() - DateTime.utc().toSeconds()), 0);

  return <div className={className}>{DurationUtils.toString(diff)}</div>;
}
