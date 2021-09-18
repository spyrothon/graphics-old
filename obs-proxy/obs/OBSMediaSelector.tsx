import * as React from "react";

import SelectInput from "../../uikit/SelectInput";
import { useOBSStore } from "./OBSStore";
import type { OBSMediaSource } from "./OBSTypes";

type OBSMediaSelector = {
  label?: React.ReactNode;
  note?: React.ReactNode;
  selectedMediaName?: string;
  marginless?: boolean;
  className?: string;
  onChange: (entry?: OBSMediaSource) => unknown;
};

export default function OBSMediaSelector(props: OBSMediaSelector) {
  const {
    label = "OBS Media Source",
    note = "Name of the media source to use in OBS.",
    selectedMediaName,
    marginless,
    className,
    onChange,
  } = props;
  const sources = useOBSStore((state) => state.mediaSourceList);

  const selected = React.useMemo(
    () => sources.find((entry) => entry.sourceName === selectedMediaName),
    [selectedMediaName, sources],
  );

  return (
    <SelectInput
      label={label}
      note={note}
      className={className}
      items={sources}
      itemToString={(entry) => entry?.sourceName ?? "(unnamed)"}
      value={selected}
      marginless={marginless}
      allowEmpty
      emptyLabel="Select an OBS Media Source"
      onChange={onChange}
    />
  );
}
