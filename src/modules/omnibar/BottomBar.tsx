import * as React from "react";
import classNames from "classnames";

import { useSafeSelector } from "../../Store";
import TeamSummary from "../../uikit/TeamSummary";
import { getTeams } from "../teams/TeamStore";
import { getHighlightedTeamId } from "./OmnibarStore";

import styles from "./Omnibar.mod.css";

export default function BottomBar() {
  const teams = useSafeSelector(getTeams);
  const highlightedTeamId = useSafeSelector(getHighlightedTeamId);

  return (
    <>
      {teams.map((team) => (
        <TeamSummary
          key={team.id}
          teamId={team.id}
          className={classNames(styles.team, {
            [styles.bottomRowActive]: highlightedTeamId == team.id,
          })}
        />
      ))}
    </>
  );
}
