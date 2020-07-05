declare namespace Twitch {
  class Player {
    static PLAYING: "playing";
    static OFFLINE: "offline";

    constructor(containerId: string, opts: object);

    addEventListener(
      event: typeof Player.PLAYING | typeof Player.OFFLINE,
      listener: () => unknown,
    ): void;
    removeEventListener(
      event: typeof Player.PLAYING | typeof Player.OFFLINE,
      listener: () => unknown,
    ): void;

    setChannel(channel?: string): void;
    setQuality(quality?: string): void;
    setVolume(volume?: number): void;
  }
}
