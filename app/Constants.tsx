export const Routes = {
  BASE_PATH: "/",
  HOME: "/",
  SCHEDULE: "/schedule",

  NEWSLETTERS: "/newsletters",
  NEWSLETTER: (newsletterId: string) => `/newsletters/${newsletterId}`,
};
