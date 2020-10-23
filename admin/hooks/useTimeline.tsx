import * as React from "react";
import { TimelineMax } from "gsap";

export default function useTimeline(opts: object) {
  const [timeline] = React.useState(() => new TimelineMax(opts));
  return timeline;
}
