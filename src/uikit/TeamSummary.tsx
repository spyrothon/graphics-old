import * as React from "react";
import classNames from "classnames";

import { useSafeSelector } from "../Store";
import { runTime } from "../Util";
import { getAccount } from "../modules/accounts/AccountStore";
import { getActiveRunForTeam } from "../modules/runs/ActiveRunStore";
import { getTeam } from "../modules/teams/TeamStore";

import styles from "./TeamSummary.mod.css";
import RunSummary from "./RunSummary";

type TeamSummaryProps = {
  teamId: string;
  wrapText?: boolean;
  className?: string;
};

export default function TeamSummary(props: TeamSummaryProps) {
  const { teamId, className, wrapText = true } = props;

  const { team, activeRun, runner } = useSafeSelector((state) => {
    const activeRun = getActiveRunForTeam(state, { teamId });
    return {
      team: getTeam(state, { teamId }),
      activeRun,
      runner: getAccount(state, { accountId: activeRun?.account_id }),
    };
  });

  if (team == null || runner == null) return null;

  return (
    <div
      className={classNames(styles.team, className, {
        [styles.noWrap]: !wrapText,
      })}
      style={{ "--color": `#${team.color}` } as React.CSSProperties}>
      <div className={styles.teamName}>{team.name}</div>
      {activeRun != null ? <RunSummary runId={activeRun.id} showProgressBar /> : null}
    </div>
  );
}
