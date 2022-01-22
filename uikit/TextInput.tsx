import * as React from "react";
import classNames from "classnames";

import InputWrapper, { InputWrapperPassthroughProps } from "./InputWrapper";

import styles from "./TextInput.mod.css";

export enum TextInputType {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
}

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
  type?: TextInputType;
  value?: string;
  placeholder?: string;
  label?: string;
  multiline?: boolean;
} & InputWrapperPassthroughProps;

export default function TextInput(props: TextInputProps) {
  const {
    name,
    label,
    type = TextInputType.TEXT,
    note,
    className,
    value,
    multiline = false,
    marginless,
    ...inputProps
  } = props;

  const Tag = multiline ? "textarea" : "input";

  const typeProps = multiline
    ? {
        rows: 4,
      }
    : {};

  return (
    <InputWrapper
      name={name}
      label={label}
      note={note}
      className={className}
      marginless={marginless}
      {...inputProps}>
      <Tag
        className={classNames(styles.input, { [styles.multiline]: multiline })}
        name={name}
        type={type}
        value={value ?? ""}
        {...typeProps}
        {...inputProps}
      />
    </InputWrapper>
  );
}
