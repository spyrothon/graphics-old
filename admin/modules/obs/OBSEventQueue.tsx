import OBSWebSocket from "obs-websocket-js";

class OBSEventQueue {
  private _subscriptions: Map<string, Function> = new Map();

  constructor(obs: OBSWebSocket) {
    obs.on("TransitionEnd", (data) => this._handleIfSubscribed("TransitionEnd", data));
  }

  onNext(eventName: string) {
    return new Promise((resolve) => {
      this.subscribe(eventName, () => {
        this.unsubscribe(eventName);
        resolve();
      });
    });
  }

  subscribe(eventName: string, listener: Function) {
    this._subscriptions.set(eventName, listener);
  }

  unsubscribe(eventName: string) {
    this._subscriptions.delete(eventName);
  }

  _handleIfSubscribed<E extends string, D>(eventName: E, data: D) {
    const subscription = this._subscriptions.get(eventName);
    if (subscription == null) return;

    subscription(data);
  }
}

export default OBSEventQueue;
