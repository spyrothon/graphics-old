import * as React from "react";

import useSafeDispatch from "@admin/hooks/useDispatch";
import RouterUtils from "@common/router/RouterUtils";
import Button from "@uikit/Button";
import Header from "@uikit/Header";
import TextInput, { TextInputType } from "@uikit/TextInput";
import { Routes } from "../../Constants";
import { useSafeSelector } from "../../Store";
import { login } from "./AuthActions";
import AuthStore from "./AuthStore";

import styles from "./AuthLogin.mod.css";

export default function AuthLogin() {
  const dispatch = useSafeDispatch();
  const isLoggedIn = useSafeSelector((state) => AuthStore.isLoggedIn(state));

  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (isLoggedIn) {
      RouterUtils.navigateTo(Routes.LIVE_DASHBOARD);
    }
  }, [isLoggedIn]);

  function handleSubmit() {
    dispatch(login(userName, password));
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Header>Login</Header>
        <TextInput
          label="User Name"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          autoFocus
        />
        <TextInput
          type={TextInputType.PASSWORD}
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button onClick={handleSubmit}>Login</Button>
      </div>
    </div>
  );
}
