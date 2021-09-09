import * as React from "react";
import classNames from "classnames";

import useSafeDispatch from "../../hooks/useDispatch";
import Button from "../../uikit/Button";
import Header from "../../uikit/Header";
import TextInput from "../../uikit/TextInput";
import OBSSceneSelector from "../obs/OBSSceneSelector";
import { persistRun } from "../runs/RunActions";
import { updateScheduleEntry } from "../schedules/ScheduleActions";

import { Run, ScheduleEntry } from "../../../api/APITypes";

type LiveRunInfoProps = {
  entry: ScheduleEntry;
  run: Run;
  className?: string;
};

export default function LiveRunInfo(props: LiveRunInfoProps) {
  const { entry, run, className } = props;
  const dispatch = useSafeDispatch();

  const [gameNameFormatted, setGameNameFormatted] = React.useState(run.gameNameFormatted);
  const [obsSceneName, setOBSSceneName] = React.useState(entry.obsSceneName);
  const hasChanges =
    gameNameFormatted !== run.gameNameFormatted || obsSceneName !== entry.obsSceneName;

  React.useEffect(() => {
    setGameNameFormatted(run.gameNameFormatted);
    setOBSSceneName(entry.obsSceneName);
  }, [run, entry]);

  function handleSave() {
    dispatch(persistRun(run.id, { gameNameFormatted }));
    dispatch(updateScheduleEntry({ ...entry, obsSceneName }));
  }

  return (
    <div className={classNames(className)}>
      <Header size={Header.Sizes.H4}>Layout Run Info</Header>
      <TextInput
        label="Formatted Game Name"
        note="Use newlines to adjust how the game name looks on stream."
        value={gameNameFormatted}
        multiline
        // @ts-expect-error TextInput needs to handle textarea props
        rows={2}
        onChange={(event) => setGameNameFormatted(event.target.value)}
      />
      <OBSSceneSelector
        selectedSceneName={obsSceneName}
        onChange={(scene) => setOBSSceneName(scene.name)}
      />
      <Button onClick={handleSave} disabled={!hasChanges}>
        Save Game Info
      </Button>
    </div>
  );
}
