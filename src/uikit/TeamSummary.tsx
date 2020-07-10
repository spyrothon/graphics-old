import * as React from "react";
import classNames from "classnames";

import { useSafeSelector } from "../Store";
import { runTime } from "../Util";
import { getAccount } from "../modules/accounts/AccountStore";
import { getActiveRunForTeam } from "../modules/runs/ActiveRunStore";
import {
  getTeam,
  isTeamFinished,
  getTeamCurrentRunTime,
  getTeamProgress,
} from "../modules/teams/TeamStore";
import RunSummary from "./RunSummary";

import styles from "./TeamSummary.mod.css";
import ProgressBar from "./ProgressBar";

type TeamSummaryProps = {
  teamId: string;
  wrapText?: boolean;
  className?: string;
};

export default function TeamSummary(props: TeamSummaryProps) {
  const { teamId, className, wrapText = true } = props;

  const { team, finished, activeRun, time, runner, progress } = useSafeSelector((state) => {
    const activeRun = getActiveRunForTeam(state, { teamId });
    return {
      team: getTeam(state, { teamId }),
      finished: isTeamFinished(state, { teamId }),
      time: getTeamCurrentRunTime(state, { teamId }),
      progress: getTeamProgress(state, { teamId }),
      activeRun,
      runner: getAccount(state, { accountId: activeRun?.account_id }),
    };
  });

  if (team == null || runner == null) return null;

  let detail = null;
  if (finished) {
    detail = (
      <div className={styles.finalTime}>
        <span style={{ opacity: 0.6 }}>Finished:</span> {runTime(time)}
      </div>
    );
  } else if (activeRun != null) {
    detail = <RunSummary runId={activeRun.id} showProgressBar />;
  }

  return (
    <div
      className={classNames(styles.team, className, {
        [styles.noWrap]: !wrapText,
        [styles.finished]: finished,
      })}
      style={{ "--color": `#${team.color}` } as React.CSSProperties}>
      <div className={styles.teamName}>{team.name}</div>
      {detail}
      <ProgressBar progress={progress} className={styles.progress} />
    </div>
  );
}
