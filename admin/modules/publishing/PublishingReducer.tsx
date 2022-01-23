import { Newsletter } from "@api/APITypes";
import { ActionFor, Action } from "../../Actions";
import { PublishingActionType } from "./PublishingTypes";

type NewsletterMap = { [id: string]: Newsletter };

type PublishingReducerState = {
  fetching: boolean;
  newsletters: NewsletterMap;
};

function handleUpdateNewsletter(
  state: PublishingReducerState,
  action: ActionFor<PublishingActionType.PUBLISHING_UPDATE_NEWSLETTER>,
) {
  const { newsletter } = action;

  return {
    ...state,
    newsletters: {
      ...state.newsletters,
      [newsletter.id]: newsletter,
    },
  };
}

function handleFetchNewslettersStarted(
  state: PublishingReducerState,
  _action: ActionFor<PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_STARTED>,
) {
  return {
    ...state,
    fetching: true,
  };
}

function handleFetchNewslettersSuccess(
  state: PublishingReducerState,
  action: ActionFor<PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_SUCCESS>,
) {
  const { newsletters } = action;
  const newslettersById = newsletters.reduce<NewsletterMap>((acc, newsletter) => {
    acc[newsletter.id] = newsletter;
    return acc;
  }, {});

  return {
    ...state,
    fetching: false,
    newsletters: { ...state.newsletters, ...newslettersById },
  };
}

const defaultState: PublishingReducerState = {
  fetching: false,
  newsletters: {},
};

export default function publishingReducer(
  state: PublishingReducerState = defaultState,
  action: Action,
): PublishingReducerState {
  switch (action.type) {
    case PublishingActionType.PUBLISHING_UPDATE_NEWSLETTER:
      return handleUpdateNewsletter(state, action);
    case PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_STARTED:
      return handleFetchNewslettersStarted(state, action);
    case PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_SUCCESS:
      return handleFetchNewslettersSuccess(state, action);
  }

  return state;
}
