import * as React from "react";

import SelectInput from "../../uikit/SelectInput";
import { useOBSStore } from "./OBSStore";

import type { Scene } from "obs-websocket-js";

type OBSSceneSelectorProps = {
  label?: React.ReactNode;
  note?: React.ReactNode;
  selectedSceneName?: string;
  marginless?: boolean;
  className?: string;
  onChange: (entry?: Scene) => unknown;
};

export default function OBSSceneSelector(props: OBSSceneSelectorProps) {
  const {
    label = "OBS Scene",
    note = "Name of the scene to use in OBS.",
    selectedSceneName,
    marginless,
    className,
    onChange,
  } = props;
  const scenes = useOBSStore((state) => state.sceneList);

  const selected = React.useMemo(() => scenes.find((entry) => entry.name === selectedSceneName), [
    selectedSceneName,
    scenes,
  ]);

  return (
    <SelectInput
      label={label}
      note={note}
      className={className}
      items={scenes}
      itemToString={(entry) => entry?.name ?? "(unnamed)"}
      value={selected}
      marginless={marginless}
      allowEmpty
      emptyLabel="Select an OBS Scene"
      onChange={onChange}
    />
  );
}
