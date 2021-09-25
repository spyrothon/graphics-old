import * as React from "react";
import classNames from "classnames";
import { animated, config, useTransition } from "react-spring";

import { useSafeSelector } from "../../Store";
import ScheduleStore from "../schedules/ScheduleStore";
import OmnibarPlainText from "./OmnibarPlainText";
import OmnibarUpNext from "./OmnibarUpNext";

import styles from "./Omnibar.mod.css";

type OmnibarProps = {
  className?: string;
};

export default function Omnibar(props: OmnibarProps) {
  const { className } = props;
  const schedule = useSafeSelector(ScheduleStore.getSchedule);

  const sections = [
    { id: "up-next", content: () => <OmnibarUpNext /> },
    {
      id: "schedule",
      content: () => (
        <OmnibarPlainText
          text={
            <>
              Check out the full schedule at{" "}
              <span className={styles.textEmphasis}>spyrothon.org</span>
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
              <span className={styles.textEmphasis}>Spyrothon 7</span> is September 25-26th, 2021
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
      {schedule?.logoUrl != null ? (
        <div className={styles.logo}>
          <img src={schedule?.logoUrl} height={54} />
        </div>
      ) : null}
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
