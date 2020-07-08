import * as React from "react";
import _ from "lodash";

import { useSafeSelector } from "../Store";
import useSafeDispatch from "../hooks/useDispatch";
import * as FeaturedRunStore from "../modules/featured_run/FeaturedRunStore";
import * as InitStore from "../modules/init/InitStore";
import * as InitActions from "../modules/init/InitActions";
import Omnibar from "../modules/omnibar/Omnibar";
import * as Socket from "../modules/socket/Socket";
import Stream from "../modules/streams/components/Stream";
import * as TimerActions from "../modules/timers/TimerActions";
import Layout from "../uikit/Layout";
import LoadingSpinner from "../uikit/LoadingSpinner";

import { EVENT_ID } from "../Constants";
import styles from "./App.mod.css";

const GLOBAL_TIMER_INTERVAL = 1000;

export default function App() {
  const dispatch = useSafeDispatch();

  const eventId = EVENT_ID;
  const featuredRunId = useSafeSelector(FeaturedRunStore.getFeaturedRunId);
  const ready = useSafeSelector(InitStore.isReady);

  React.useEffect(() => {
    Socket.bindSocketToDispatch(dispatch);
    dispatch(InitActions.fetchAll(eventId));
  }, [dispatch, eventId]);

  React.useEffect(() => {
    TimerActions.startTimers(dispatch, GLOBAL_TIMER_INTERVAL);
    return () => TimerActions.stopTimers();
  });

  if (!ready) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.layoutContainer}>
        <div className={styles.featuredLeft}>
          <Stream runId="673" volume={0} />
        </div>
        <div className={styles.featuredRight}>
          <Stream runId="673" volume={0} />
        </div>

        <div className={styles.left}>
          <Stream runId="673" volume={0} />
        </div>
        <div className={styles.center}>
          <Stream runId="673" volume={0} />
        </div>
        <div className={styles.right}>
          <Stream runId="673" volume={0} />
        </div>

        <div className={styles.omnibar}>
          <Omnibar />
        </div>
      </div>
    </Layout>
  );
}
