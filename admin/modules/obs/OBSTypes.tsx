export interface OBSTransition {
  name: string;
}

export enum OBSCustomEventTypes {
  TRANSITION_SEQUENCE_STARTED = "transition_sequence_started",
  TRANSITION_SEQUENCE_ENDED = "transition_sequence_ended",
}

export interface OBSCustomEvent {
  type: string;
  originator?: string;
}

export interface TransitionSequenceStarted extends OBSCustomEvent {
  type: OBSCustomEventTypes.TRANSITION_SEQUENCE_STARTED;
}

export interface TransitionSequenceEnded extends OBSCustomEvent {
  type: OBSCustomEventTypes.TRANSITION_SEQUENCE_ENDED;
}
