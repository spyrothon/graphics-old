import * as React from "react";

import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import Sequenced from "../../uikit/anim/Sequenced";
import { getTeams } from "../teams/TeamStore";
import BottomBar from "./BottomBar";
import { setHighlightedTeam } from "./OmnibarActions";
import { getHighlightedTeamId } from "./OmnibarStore";
import TeamRuns from "./details/TeamRuns";
import UpcomingRuns from "./details/UpcomingRuns";

import styles from "./Omnibar.mod.css";
import LogoTimer from "./details/LogoTimer";

export default function Omnibar() {
  const dispatch = useSafeDispatch();
  const highlightedTeamId = useSafeSelector(getHighlightedTeamId);
  const teams = useSafeSelector(getTeams);

  const rotateTeam = React.useCallback(
    (index: number) => {
      const nextTeam = teams[index % teams.length];
      dispatch(setHighlightedTeam(nextTeam.id));
    },
    [highlightedTeamId, teams],
  );

  // Kick off the cycle with a rotation to highlight the first team.
  React.useEffect(() => {
    rotateTeam(0);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <Sequenced>
          <UpcomingRuns />
          <Sequenced onNext={rotateTeam}>
            {teams.map((team) => (
              <TeamRuns key={team.id} teamId={team.id} />
            ))}
          </Sequenced>
        </Sequenced>
      </div>
      <div className={styles.bottomRow}>
        <LogoTimer className={styles.logo} />
        <BottomBar />
      </div>
    </div>
  );
}
