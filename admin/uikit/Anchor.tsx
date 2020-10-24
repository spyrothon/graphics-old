import * as React from "react";
import classNames from "classnames";

import styles from "./Anchor.mod.css";

type AnchorProps =
  | {
      href: string;
      target?: string;
      rel?: string;
      className?: string;
      children: React.ReactNode;
      onClick?: () => unknown;
    }
  | {
      href?: undefined;
      className?: string;
      children: React.ReactNode;
      onClick: () => unknown;
    };

const Anchor = (props: AnchorProps) => {
  const { children, className, href, ...linkProps } = props;

  const isLocal = href == null || !/(?:^[a-z][a-z0-9+.-]*:|\/\/)/.test(href);

  if (!isLocal) {
    return (
      <a
        tabIndex={0}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(styles.anchor, "block-external", className)}
        {...linkProps}>
        {children}
      </a>
    );
  }

  return (
    <a
      tabIndex={0}
      href={href}
      role={href == null ? "button" : "link"}
      {...linkProps}
      className={classNames(styles.anchor, className)}>
      {children}
    </a>
  );
};

export default Anchor;
