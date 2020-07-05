import * as React from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { Team } from "../modules/teams/TeamTypes";
import Run from "./Run";

import style from "./FeaturedIndicator.mod.css";

type FeaturedIndicatorProps = {
  runId: string;
  team: Team;
  className?: string;
};

const FeaturedIndicator = (props: FeaturedIndicatorProps) => {
  const { runId, team, className } = props;

  return (
    <div class={classNames(style.container, className)} style={{ "--color": `#${team.color}` }}>
      <div class={style.teamName}>{team.name}</div>

      <Run className={style.runInfo} runId={runId} midRow="game" />
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const { runId } = props;

  const run = state.runs[runId];
  const team = run && state.teams[run.team_id];

  return {
    team,
  };
};

export default connect(mapStateToProps)(FeaturedIndicator);
