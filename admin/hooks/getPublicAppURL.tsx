import { APP_HOST } from "@api/Config";
import { Routes as AppRoutes } from "@app/Constants";

export default function getPublicAppURL(route: typeof AppRoutes[keyof typeof AppRoutes]) {
  return `${APP_HOST}${route}`;
}
