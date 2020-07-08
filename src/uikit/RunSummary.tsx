import * as React from "react";
import classNames from "classnames";

import { useSafeSelector } from "../Store";
import { runTime } from "../Util";
import { getAccount } from "../modules/accounts/AccountStore";
import { getGame } from "../modules/games/GameStore";
import { getRun, getRunProgress } from "../modules/runs/RunStore";
import { getTeam } from "../modules/teams/TeamStore";
import Avatar from "./Avatar";
import LiveTimer from "./LiveTimer";
import ProgressBar from "./ProgressBar";

import style from "./RunSummary.mod.css";

type RunSummaryProps = {
  runId: string;
  midRow?: "game" | "team";
  timeRow?: React.ReactNode;
  showProgressBar?: boolean;
  wrapText?: boolean;
  className?: string;
};

export default function RunSummary(props: RunSummaryProps) {
  const {
    runId,
    showProgressBar = false,
    wrapText = true,
    midRow = "game",
    timeRow,
    className,
  } = props;

  const { run, game, runner, team, progress, ready } = useSafeSelector((state) => {
    const run = getRun(state, { runId });
    const game = getGame(state, { gameId: run.game_id });
    const team = getTeam(state, { teamId: run.team_id });
    const runner = getAccount(state, { accountId: run.account_id });
    const progress = run ? getRunProgress(state, { runId }) : 0;

    return {
      run,
      game,
      runner,
      team,
      progress,
      ready: run && runner && game && team,
    };
  });

  const renderMidRow = () => {
    switch (midRow) {
      case "team":
        return <div className={style.teamName}>{team.name}</div>;
      case "game":
      default:
        return <div className={style.gameName}>{game.name}</div>;
    }
  };

  const renderTimeRow = () => {
    if (timeRow != null) return timeRow;

    if (run.actual_seconds) {
      return (
        <div className={style.detail}>
          <span className={style.muted}>FINISHED: </span>
          <span className={style.estimate}>{runTime(run.actual_seconds)}</span>
        </div>
      );
    } else if (run.started_at) {
      return (
        <div className={style.detail}>
          <span className={style.muted}>IN PROGRESS: </span>
          <LiveTimer className={style.estimate} startedAt={run.started_at} />
        </div>
      );
    } else {
      return (
        <div className={style.detail}>
          <span className={style.muted}>ESTIMATE: </span>
          <span className={style.estimate}>{runTime(run.pb_seconds)}</span>
        </div>
      );
    }
  };

  if (!ready) return null;

  return (
    <div
      className={classNames(style.run, className, {
        [style.noWrap]: !wrapText,
      })}
      style={{ "--color": `#${team.color}` } as React.CSSProperties}>
      {ready ? (
        <>
          <div className={style.runnerAvatar}>
            <Avatar src={runner.avatar_hash} size={48} />
          </div>
          <div className={style.runInfo}>
            <div className={style.runnerName}>{runner.username}</div>
            {renderMidRow()}
            {renderTimeRow()}
            {showProgressBar && <ProgressBar className={style.progress} progress={progress} />}
          </div>
        </>
      ) : null}
    </div>
  );
}
