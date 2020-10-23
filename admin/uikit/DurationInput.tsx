import * as React from "react";

import * as DurationUtils from "../modules/time/DurationUtils";
import TextInput, { TextInputProps } from "./TextInput";

type DurationInputProps = Omit<TextInputProps, "value" | "onChange"> & {
  value?: number;
  onChange: (value: number) => unknown;
};

export default function DurationInput(props: DurationInputProps) {
  const { value, onChange, ...otherProps } = props;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const duration = DurationUtils.fromString(event.target.value);
    onChange(duration);
  }

  return (
    <TextInput {...otherProps} value={DurationUtils.toString(value)} onChange={handleChange} />
  );
}
