import * as React from "react";
import classNames from "classnames";

import styles from "./Layout.mod.css";

import backgroundVideo from "../res/BT1.mp4";

type LayoutProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  React.useLayoutEffect(() => {
    if (videoRef.current == null) return;
    videoRef.current.playbackRate = 0.7;
  }, []);

  return (
    <div className={classNames(styles.layout, props.className)}>
      <video
        ref={videoRef}
        className={styles.background}
        preload="auto"
        muted
        playsInline
        loop
        controls={false}>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
