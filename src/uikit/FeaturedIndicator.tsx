import * as React from "react";
import classNames from "classnames";

import { useSafeSelector } from "../Store";
import { getRun } from "../modules/runs/RunStore";
import { getTeam } from "../modules/teams/TeamStore";
import RunSummary from "./RunSummary";

import style from "./FeaturedIndicator.mod.css";

type FeaturedIndicatorProps = {
  runId: string;
  className?: string;
};

export default function FeaturedIndicator(props: FeaturedIndicatorProps) {
  const { runId, className } = props;

  const team = useSafeSelector((state) => {
    const run = getRun(state, { runId });
    return getTeam(state, { teamId: run.team_id });
  });

  return (
    <div
      className={classNames(style.container, className)}
      style={{ "--color": `#${team.color}` } as React.CSSProperties}>
      <div className={style.teamName}>{team.name}</div>

      <RunSummary className={style.runInfo} runId={runId} midRow="game" />
    </div>
  );
}
