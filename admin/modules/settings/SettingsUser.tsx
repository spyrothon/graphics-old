import * as React from "react";

import useSafeDispatch from "@admin/hooks/useDispatch";
import useSaveable from "@common/hooks/useSaveable";
import Button from "@uikit/Button";
import Header from "@uikit/Header";
import TextInput, { TextInputType } from "@uikit/TextInput";
import { useSafeSelector } from "../../Store";
import AuthStore from "../auth/AuthStore";
import { updateMe } from "../auth/AuthActions";

export default function SettingsUser() {
  const dispatch = useSafeDispatch();

  // This has a non-null assertion because to be on this page you must be logged in.
  const user = useSafeSelector(AuthStore.getUser)!;
  const [editedUser, setEditedUser] = React.useState(user);
  const [password, setPassword] = React.useState("");

  const [handleSave, getSaveText] = useSaveable(async () => {
    dispatch(updateMe(editedUser, password));
  });

  React.useEffect(() => {
    setEditedUser(user);
  }, [user]);

  return (
    <div>
      <Header>User Settings</Header>
      <TextInput
        label="Name"
        value={editedUser.name}
        onChange={(event) => setEditedUser({ ...editedUser, name: event.target.value })}
      />
      <TextInput
        label="Password"
        value={password}
        type={TextInputType.PASSWORD}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button onClick={handleSave} disabled={password.length === 0}>
        {getSaveText()}
      </Button>
    </div>
  );
}
