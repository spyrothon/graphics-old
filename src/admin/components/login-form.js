import * as React from "react";

import * as AuthActions from "../actions/auth";

import style from "./login-form.mod.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this._handleSubmit.bind(this);
    this.handleUsernameChange = this._handleUsernameChange.bind(this);
    this.handlePasswordChange = this._handlePasswordChange.bind(this);

    this.state = {
      username: "",
      password: "",
    };
  }

  _handleSubmit() {
    const { dispatch } = this.props;
    const { username, password } = this.state;

    if (username != "" && password != "") {
      dispatch(AuthActions.loginUser(username, password));
    }
  }

  _handleUsernameChange(ev) {
    ev.preventDefault();
    const newValue = ev.target.value;

    this.setState({
      username: newValue,
    });
  }

  _handlePasswordChange(ev) {
    ev.preventDefault();
    const newValue = ev.target.value;

    this.setState({
      password: newValue,
    });
  }

  render() {
    const { username, password } = this.state;

    return (
      <div className={style.container}>
        <input
          className={style.input}
          type="text"
          placeholder="username"
          value={username}
          onChange={this.handleUsernameChange}
        />
        <input
          className={style.input}
          type="password"
          placeholder="password"
          value={password}
          onChange={this.handlePasswordChange}
        />

        <button className={style.button} onClick={this.handleSubmit}>
          Login
        </button>
      </div>
    );
  }
}

export default LoginForm;
