import * as React from "react";
import classNames from "classnames";

import style from "./section.mod.css";

const Section = (props) => {
  const { title, children, className } = props;

  return (
    <div className={classNames(style.section, className)}>
      <h1 className={style.sectionTitle}>{title}</h1>

      <div className={style.sectionContent}>{children}</div>
    </div>
  );
};

export default Section;
