import * as React from "react";
import classNames from "classnames";
import { animated, config, useTransition } from "react-spring";

import OmnibarPlainText from "./OmnibarPlainText";
import OmnibarUpNext from "./OmnibarUpNext";

import styles from "./Omnibar.mod.css";

import logo from "../../res/spyrothon_6_logo.png";

type OmnibarProps = {
  className?: string;
};

export default function Omnibar(props: OmnibarProps) {
  const { className } = props;

  const sections = [
    { id: "up-next", content: () => <OmnibarUpNext /> },
    {
      id: "schedule",
      content: () => (
        <OmnibarPlainText
          text={
            <>
              Check out the full schedule at{" "}
              <span className={styles.textEmphasis}>spyrothon.org/schedule</span>
            </>
          }
        />
      ),
    },
    {
      id: "discord",
      content: () => (
        <OmnibarPlainText
          text={
            <>
              Join the Spyrothon Discord{" "}
              <span className={styles.textEmphasis}>discord.gg/fCvfnfk</span>
            </>
          }
        />
      ),
    },
    {
      id: "twitter",
      content: () => (
        <OmnibarPlainText
          text={
            <>
              Keep up with Spyrothon on Twitter{" "}
              <span className={styles.textEmphasis}>@spyrothon</span>
            </>
          }
        />
      ),
    },
    {
      id: "dates",
      content: () => (
        <OmnibarPlainText
          text={
            <>
              <span className={styles.textEmphasis}>Spyrothon 6</span> is November 6-8, 2020
            </>
          }
        />
      ),
    },
    {
      id: "art",
      content: () => (
        <OmnibarPlainText
          text={
            <>
              Check out the Spyro 3 Art Collab{" "}
              <span className={styles.textEmphasis}>@Spyro3_collab</span>
            </>
          }
        />
      ),
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  React.useEffect(() => {
    setInterval(() => setCurrentIndex((currentIndex) => currentIndex + 1), 25000);
  }, []);
  const currentSection = sections[currentIndex % sections.length];

  const transitions = useTransition(currentSection, (item) => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  });

  return (
    <div className={classNames(styles.omnibar, className)}>
      <div className={styles.logo}>
        <img src={logo} height={54} />
      </div>
      <div className={styles.mainContent}>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props} className={styles.section}>
            {item.content()}
          </animated.div>
        ))}
      </div>
    </div>
  );
}
