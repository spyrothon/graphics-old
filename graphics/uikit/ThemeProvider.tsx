import * as React from "react";

import styles from "./ThemeProvider.mod.css";

const ThemeProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return <div className={styles.theme}>{children}</div>;
};

export default ThemeProvider;
