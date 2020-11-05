import { RunParticipant } from "../../../api/APITypes";

function getVisibleParticipants(participants: RunParticipant[]) {
  return participants.filter((participant) => participant.visible);
}

export default {
  getVisibleParticipants,
};
