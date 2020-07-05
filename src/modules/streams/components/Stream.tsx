import * as React from "react";
import _ from "lodash";

import { useSafeSelector } from "../../../Store";
import { getAccount } from "../../accounts/AccountStore";
import { getRun } from "../../runs/RunStore";
import style from "./Stream.mod.css";

// Set this to use thumbnails instead of interactive twitch players.
// Reduces load times and helps React Dev Tools not break.
const USE_STREAM_PLACEHOLDERS = true;

const GLOBAL_PLAYER_OPTIONS = {
  width: "100%",
  height: "100%",
  controls: false,
};

const QUALITIES = {
  VERY_LOW: "160p30",
  LOW: "360p30",
  NORMAL: "480p30",
  HIGH: "720p30",
  SOURCE: "chunked",
};

type StreamProps = {
  runId: string;
  quality: typeof QUALITIES[keyof typeof QUALITIES];
  volume: number;
  onStreamReady: () => unknown;
  onStreamUnready: () => unknown;
};

export default function Stream(props: StreamProps) {
  const { runId, quality, volume, onStreamReady, onStreamUnready } = props;

  const twitchName = useSafeSelector((state) => {
    const run = getRun(state, { runId });
    const account = getAccount(state, { accountId: run.account_id });

    return account?.twitch?.toLowerCase();
  });

  const playerContainer = React.useRef<HTMLDivElement>(null);
  const [playerContainerId] = React.useState(() => _.uniqueId("stream_player_"));

  let player: Twitch.Player | undefined = undefined;
  React.useLayoutEffect(() => {
    player = new Twitch.Player(playerContainerId, { ...GLOBAL_PLAYER_OPTIONS });
  }, []);

  React.useLayoutEffect(() => {
    player?.addEventListener(Twitch.Player.PLAYING, onStreamReady);
    player?.addEventListener(Twitch.Player.OFFLINE, onStreamUnready);
    player?.setVolume(0);

    return () => {
      player?.removeEventListener(Twitch.Player.PLAYING, onStreamReady);
      player?.removeEventListener(Twitch.Player.OFFLINE, onStreamUnready);
    };
  }, [player, onStreamReady, onStreamUnready]);

  React.useEffect(() => {
    if (USE_STREAM_PLACEHOLDERS) return;

    if (twitchName == null) return;

    player?.setChannel(twitchName);
    player?.setQuality(quality);
    player?.setVolume(volume);
  }, [twitchName, quality, volume]);

  if (USE_STREAM_PLACEHOLDERS) {
    const thumbSrc = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${twitchName}-320x180.jpg`;

    return (
      <div className={style.playerContainer}>
        <img className={style.thumbnail} src={thumbSrc} />
      </div>
    );
  }

  return <div className={style.playerContainer} id={playerContainerId} ref={playerContainer} />;
}

Stream.Qualities = QUALITIES;
