import * as React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import _ from "lodash";

import * as AuthStore from "./selectors/auth";
import * as InitStore from "../modules/init/InitStore";
import * as InitActions from "../modules/init/InitActions";
import * as StreamSyncActions from "./actions/stream-sync";
import LoginForm from "./components/login-form";
// import CurrentRunsSection from "./components/sections/current-runs";
// import CurrentTimeSection from "./components/sections/current-time";
import EventTimeSection from "./components/sections/event-time";
// import FeaturedRunSection from "./components/sections/featured-run";
// import PreshowSection from "./components/sections/preshow";
// import RawStateSection from "./components/sections/raw-state";
// import ResyncSection from "./components/sections/resync";
// import SocketStatusSection from "./components/sections/socket-status";
// import TeamSection from "./components/sections/teams";
import LoadingSpinner from "../uikit/LoadingSpinner";

import { EVENT_ID } from "../Constants";
import style from "./admin.mod.css";

class App extends React.Component {
  componentDidMount() {
    const { eventId, dispatch } = this.props;
    StreamSyncActions.bindSocketToDispatch(dispatch);

    dispatch(InitActions.fetchAll(EVENT_ID));
  }

  render() {
    const { isAuthenticated, ready, dispatch } = this.props;

    if (!ready) {
      return (
        <div className={style.container}>
          <LoadingSpinner />
        </div>
      );
    }

    return (
      <div className={classNames(style.body, "admin-dashboard")}>
        <div className={style.container}>
          {isAuthenticated ? (
            <React.Fragment>
              <EventTimeSection className={style.eventTime} />
            </React.Fragment>
          ) : (
            <LoginForm dispatch={dispatch} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const ready = InitStore.isReady(state);

  const isAuthenticated = AuthStore.isLoggedIn(state);

  return {
    eventId: EVENT_ID,
    isAuthenticated,
    ready,
  };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(App);
