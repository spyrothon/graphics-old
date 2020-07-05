import { Account, AccountAction, AccountActionTypes } from "./AccountTypes";

import { ActionFor } from "../../Actions";

type AccountState = {
  [id: string]: Account;
};

const defaultState: AccountState = {};

function handleReceiveAccounts(state: AccountState, { data }: ActionFor<"RECEIVE_ACCOUNTS">) {
  const { accounts } = data;
  const accountsById = accounts.reduce((acc, account) => {
    // @ts-ignore
    acc[account.id] = account;
    return acc;
  }, {});

  return {
    ...state,
    ...accountsById,
  };
}

export function accountsReducer(state = defaultState, action: AccountAction): AccountState {
  switch (action.type) {
    case AccountActionTypes.RECEIVE_ACCOUNTS:
      return handleReceiveAccounts(state, action);
  }

  return state;
}
