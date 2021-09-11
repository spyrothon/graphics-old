import * as React from "react";

import Button from "./Button";
import { useHistory, useLocation } from "react-router-dom";

type ButtonProps = React.ComponentProps<typeof Button>;

interface NavLinkProps extends ButtonProps {
  route: string;
  label: React.ReactNode;
  exact?: boolean;
  activeColor?: ButtonProps["color"];
}

export default function NavLink(props: NavLinkProps) {
  const { route, label, exact, color, activeColor, ...buttonProps } = props;

  const location = useLocation();
  const isActive = exact ? location.pathname === route : location.pathname.startsWith(route);
  const history = useHistory();

  function handleClick() {
    if (isActive) return;

    history.push(route);
  }

  const buttonColor = isActive
    ? activeColor ?? Button.Colors.PRIMARY
    : color ?? Button.Colors.DEFAULT;

  return (
    <Button {...buttonProps} onClick={handleClick} color={buttonColor}>
      {label}
    </Button>
  );
}
