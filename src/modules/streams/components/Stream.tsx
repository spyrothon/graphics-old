import * as React from "react";
import _ from "lodash";

import { useSafeSelector } from "../../../Store";
import { getAccount } from "../../accounts/AccountStore";
import { getRun } from "../../runs/RunStore";
import style from "./Stream.mod.css";

// Set this to use thumbnails instead of interactive twitch players.
// Reduces load times and helps React Dev Tools not break.
const USE_STREAM_PLACEHOLDERS = false;

const GLOBAL_PLAYER_OPTIONS = {
  width: "100%",
  height: "100%",
  controls: false,
  parent: ["mcsn.gg"],
};

const QUALITIES = {
  VERY_LOW: "160p30",
  LOW: "360p30",
  NORMAL: "480p30",
  HIGH: "720p30",
  SOURCE: "chunked",
};

type StreamProps = {
  runId?: string;
  quality?: typeof QUALITIES[keyof typeof QUALITIES];
  volume?: number;
  onStreamReady?: () => unknown;
  onStreamUnready?: () => unknown;
};

const Stream = React.memo((props: StreamProps) => {
  const { runId, quality = QUALITIES.NORMAL, volume = 0, onStreamReady, onStreamUnready } = props;

  const twitchName = useSafeSelector((state) => {
    if (runId == null) return null;

    const run = getRun(state, { runId });
    if (run == null) return null;

    const account = getAccount(state, { accountId: run.account_id });
    return account?.twitch?.toLowerCase();
  });

  const playerContainer = React.useRef<HTMLDivElement>(null);
  const [playerContainerId] = React.useState(() => _.uniqueId("stream_player_"));
  const player = React.useRef<Twitch.Player>();

  React.useLayoutEffect(() => {
    if (USE_STREAM_PLACEHOLDERS) return;
    if (twitchName == null) return;

    if (player.current == null) {
      const newPlayer = new Twitch.Player(playerContainerId, {
        ...GLOBAL_PLAYER_OPTIONS,
        channel: twitchName,
        muted: true,
      });
      player.current = newPlayer;
    }

    player.current.setChannel(twitchName);
    player.current.setQuality(quality);
    player.current.setVolume(volume);
  }, [twitchName, quality, volume]);

  // The embed won't let you control volume until you mute and unmute the player
  // after it starts playing.
  function initPlayerVolume() {
    player.current?.setVolume(0.01);
    player.current?.setMuted(false);
    player.current?.setVolume(volume);
  }

  React.useLayoutEffect(() => {
    const { current } = player;
    if (current == null) return;

    current.addEventListener(Twitch.Player.PLAYING, initPlayerVolume);
    onStreamReady != null && current.addEventListener(Twitch.Player.PLAYING, onStreamReady);
    onStreamUnready != null && current.addEventListener(Twitch.Player.OFFLINE, onStreamUnready);
    current.setVolume(volume);

    return () => {
      current.removeEventListener(Twitch.Player.PLAYING, initPlayerVolume);
      onStreamReady != null && current.removeEventListener(Twitch.Player.PLAYING, onStreamReady);
      onStreamUnready != null &&
        current.removeEventListener(Twitch.Player.OFFLINE, onStreamUnready);
    };
  }, [player, onStreamReady, onStreamUnready]);

  if (USE_STREAM_PLACEHOLDERS) {
    const thumbSrc = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${twitchName}-854x480.jpg`;

    return (
      <div className={style.playerContainer}>
        <img className={style.thumbnail} src={thumbSrc} />
      </div>
    );
  }

  return <div className={style.playerContainer} id={playerContainerId} ref={playerContainer} />;
});

Stream.Qualities = QUALITIES;

export default Stream;
