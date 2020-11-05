import SyncSocket from "../../../api/socket/SyncSocket";
import { SyncSocketMessage } from "../../../api/socket/SyncSocketTypes";
import { store } from "../../Store";
import { loadSchedule } from "../schedules/ScheduleActions";

class SyncSocketManager {
  private socket?: SyncSocket;

  init() {
    this.socket = new SyncSocket(this.handleMessage);
    this.socket.connect();
  }

  stop() {
    this.socket?.disconnect();
  }

  handleMessage = (message: SyncSocketMessage) => {
    console.log("received from socket", message);
    switch (message.type) {
      case "load_schedule":
        store.dispatch(loadSchedule(message.schedule));
        return;
      // case "refresh_runs":
      // store.dispatch(fetchRuns());
    }
  };
}

export default new SyncSocketManager();
