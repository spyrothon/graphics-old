import * as React from "react";

// TODO: Maybe split this into a separate theme definition?
import styles from "../graphics/uikit/ThemeProvider.mod.css";

const ThemeProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return <div className={styles.theme}>{children}</div>;
};

export default ThemeProvider;
