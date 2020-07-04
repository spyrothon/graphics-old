import { commonThunk, denulled } from "../../util/Thunk";
import { Account, AccountActionTypes } from "./AccountTypes";

type AccountsResponse = {
  accounts: Account[];
};

export function fetchAccounts(accountIds?: string[]) {
  return commonThunk(
    {
      method: "GET",
      path: "/api/v1/accounts",
      name: "accounts",
      query: denulled({
        account_ids: accountIds,
      }),
    },
    (dispatch, response: AccountsResponse) => {
      dispatch(receiveAccounts(response.accounts));
    },
  );
}

type AccountResponse = {
  account: Account;
};

export function fetchAccount(accountId: string) {
  return commonThunk(
    {
      method: "GET",
      path: `/api/v1/accounts/${accountId}`,
      name: `accounts.${accountId}`,
      query: denulled({
        embed: "runs",
      }),
    },
    (dispatch, response: AccountResponse) => {
      dispatch(receiveAccounts([response.account]));
    },
  );
}

export function receiveAccounts(accounts: Account[]) {
  return {
    type: AccountActionTypes.RECEIVE_ACCOUNTS,
    data: {
      accounts,
    },
  };
}
