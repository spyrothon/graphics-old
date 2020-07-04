export type Account = {
  id: string;
  username: string;
  bio?: string;
  discord_username?: string;
  discord_discriminator?: string;
  discord_tag: string;
  twitch?: string;
  twitter?: string;
  timezone?: string;
  admin: boolean;
  avatar_hash: string;
};

export enum AccountActionTypes {
  RECEIVE_ACCOUNTS = "RECEIVE_ACCOUNTS",
}

export type AccountAction = { type: "RECEIVE_ACCOUNTS"; data: { accounts: Account[] } };
