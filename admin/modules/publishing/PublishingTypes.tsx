import type { Newsletter } from "@api/APITypes";

export enum PublishingActionType {
  PUBLISHING_UPDATE_NEWSLETTER = "PUBLISHING_UPDATE_NEWSLETTER",
  PUBLISHING_FETCH_NEWSLETTERS_STARTED = "PUBLISHING_FETCH_NEWSLETTERS_STARTED",
  PUBLISHING_FETCH_NEWSLETTERS_SUCCESS = "PUBLISHING_FETCH_NEWSLETTERS_SUCCESS",
}

export type PublishingAction =
  | {
      type: PublishingActionType.PUBLISHING_UPDATE_NEWSLETTER;
      newsletter: Newsletter;
    }
  | { type: PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_STARTED }
  | {
      type: PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_SUCCESS;
      newsletters: Newsletter[];
    };
