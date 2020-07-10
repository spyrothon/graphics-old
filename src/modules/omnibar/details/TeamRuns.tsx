import * as React from "react";
import classNames from "classnames";
import _ from "lodash";

import { useSafeSelector } from "../../../Store";
import useTimeline from "../../../hooks/useTimeline";
import SlideCycle from "../../../uikit/anim/SlideCycle";
import RunSummary from "../../../uikit/RunSummary";
import * as TeamStore from "../../teams/TeamStore";
import styles from "./TeamRuns.mod.css";

type TeamRunsProps = {
  teamId: string;
  className?: string;
  onComplete?: () => unknown;
};

export default function TeamRuns(props: TeamRunsProps) {
  const { teamId, className, onComplete } = props;

  const { team, runIds } = useSafeSelector((state) => ({
    team: TeamStore.getTeam(state, { teamId }),
    runIds: TeamStore.getTeamRunIds(state, { teamId }),
  }));

  const headerRef = React.useRef<HTMLDivElement>(null);
  const timeline = useTimeline({ paused: true, autoRemoveChildren: true });
  const childTimeline = useTimeline({ autoRemoveChildren: true });

  React.useLayoutEffect(() => {
    if (headerRef.current == null) return;

    timeline
      // In
      .set(headerRef.current, { opacity: 0 })
      .set(headerRef.current, { x: -320 })
      .to(headerRef.current, 0.2, { opacity: 1 })
      .to(headerRef.current, 0.3, { x: 0, ease: "Power2.easeOut" })
      // Children
      .add(childTimeline, "-=0.1")
      // Out
      .to(headerRef.current, 0.5, { x: -320, ease: "Power2.easeIn" })
      .eventCallback("onComplete", () => onComplete?.())
      .play();
  }, []);

  return (
    <div
      className={classNames(styles.content, className)}
      style={{ "--color": `#${team.color}` } as React.CSSProperties}>
      <div ref={headerRef} className={styles.teamHeader}>
        <p>{team.name}</p>
      </div>
      <SlideCycle className={styles.content} timeline={childTimeline}>
        {_.map(runIds, (runId) => (
          <RunSummary className={styles.run} key={runId} runId={runId} midRow="game" />
        ))}
      </SlideCycle>
    </div>
  );
}
