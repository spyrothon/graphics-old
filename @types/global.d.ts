declare namespace Twitch {
  type PlayerEvent = typeof Player.PLAY | typeof Player.PLAYING | typeof Player.OFFLINE;

  class Player {
    static PLAY: "play";
    static PLAYING: "playing";
    static OFFLINE: "offline";

    constructor(containerId: string, opts: object);

    addEventListener(event: PlayerEvent, listener: () => unknown): void;
    removeEventListener(event: PlayerEvent, listener: () => unknown): void;

    setChannel(channel?: string): void;
    setQuality(quality?: string): void;
    setVolume(volume?: number): void;
    setMuted(muted: boolean): void;

    getChannel(): string;
    getQuality(): string;
    getVolume(): number;
    getMuted(): boolean;
  }
}
