import * as React from "react";

import InputWrapper, { InputWrapperPassthroughProps } from "./InputWrapper";

import styles from "./SelectInput.mod.css";

export type SelectInputProps<T> = {
  value?: T;
  items: T[];
  itemToString: (item?: T) => string;
  renderItem: (item: T) => React.ReactNode;
  onChange: (item?: T) => unknown;
} & InputWrapperPassthroughProps;

export default function SelectInput<T>(props: SelectInputProps<T>) {
  const {
    name,
    label,
    note,
    className,
    renderItem,
    onChange,
    value,
    items,
    itemToString,
    ...comboboxProps
  } = props;

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const entry = items.find((item) => itemToString(item) === event.target.value);
    onChange(entry);
  }

  return (
    <InputWrapper name={name} label={label} note={note} className={className} {...comboboxProps}>
      <select className={styles.input} value={itemToString(value)} onChange={handleChange}>
        {items.map((item) => {
          const string = itemToString(item);
          return (
            <option key={string} value={string}>
              {string}
            </option>
          );
        })}
      </select>
    </InputWrapper>
  );
}