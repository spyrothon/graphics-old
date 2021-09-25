import * as React from "react";
import classNames from "classnames";

import getRTMPStats from "./getRTMPStats";

import styles from "./RTMPStreams.mod.css";

interface RTMPStreamsProps {
  rtmpHost: string;
  className?: string;
}

export default function RTMPStreams(props: RTMPStreamsProps) {
  const { rtmpHost, className } = props;

  const [stats, setStats] = React.useState<any>();
  React.useEffect(() => {
    (async function () {
      const stats = await getRTMPStats(rtmpHost);
      console.log("getting rtmp stats", stats);
      setStats(stats);
    })();
  }, [rtmpHost]);

  return <div className={classNames(styles.container, className)}>{stats}</div>;
}
