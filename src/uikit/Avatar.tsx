import * as React from "react";
import classNames from "classnames";

import { ASSETS_URL } from "../Constants";
import style from "./Avatar.mod.css";

type AvatarProps = {
  url?: string;
  src: string;
  size?: 16 | 24 | 32 | 48 | 64 | 96 | 128;
  className?: string;
};

export default function Avatar(props: AvatarProps) {
  const {
    url = ASSETS_URL,
    src,
    size = 128, // should be one of 16, 24, 32, 48, 64, 96, 128
    className,
  } = props;

  const assetUrl = `${url}/${src}`;

  return (
    <img
      className={classNames(style.avatar, className)}
      width={size}
      height={size}
      src={assetUrl}
    />
  );
}
