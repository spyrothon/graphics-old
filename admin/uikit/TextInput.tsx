import * as React from "react";

import InputWrapper, { InputWrapperPassthroughProps } from "./InputWrapper";

import styles from "./TextInput.mod.css";

export enum TextInputType {
  TEXT = "text",
  EMAIL = "email",
}

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: TextInputType;
  value?: string;
  placeholder?: string;
  label?: string;
} & InputWrapperPassthroughProps;

export default function TextInput(props: TextInputProps) {
  const { name, label, type = TextInputType.TEXT, note, className, value, ...inputProps } = props;

  return (
    <InputWrapper name={name} label={label} note={note} className={className} {...inputProps}>
      <input className={styles.input} name={name} type={type} value={value ?? ""} {...inputProps} />
    </InputWrapper>
  );
}
