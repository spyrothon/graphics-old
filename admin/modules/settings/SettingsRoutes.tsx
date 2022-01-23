import * as React from "react";
import { Twitch, Settings, Airplay, PlusCircle, Icon, User, Edit, Mail } from "react-feather";

import { Routes } from "../../Constants";
import SettingsCreateSchedule from "./SettingsCreateSchedule";
import SettingsGeneral from "./SettingsGeneral";
import SettingsManageSchedule from "./SettingsManageSchedule";
import SettingsOBSHost from "./SettingsOBSHost";
import SettingsStreamTemplates from "./SettingsStreamTemplates";
import SettingsUser from "./SettingsUser";

interface SettingsRoute {
  id: string;
  icon?: Icon;
  label: React.ReactNode;
  route: typeof Routes[keyof typeof Routes];
  exact?: boolean;
  render: () => React.ReactNode;
}

const SETTINGS_ROUTES: SettingsRoute[] = [
  {
    id: "general",
    icon: Settings,
    label: "General",
    route: Routes.SETTINGS,
    exact: true,
    render: () => <SettingsGeneral />,
  },
  {
    id: "manage-schedule",
    icon: Edit,
    label: "Manage Schedule",
    route: Routes.SETTINGS_MANAGE_SCHEDULE,
    render: () => <SettingsManageSchedule />,
  },
  {
    id: "create-schedule",
    icon: PlusCircle,
    label: "Create a Schedule",
    route: Routes.SETTINGS_CREATE_SCHEDULE,
    render: () => <SettingsCreateSchedule />,
  },
  {
    id: "obs",
    icon: Airplay,
    label: "OBS Remote",
    route: Routes.SETTINGS_OBS,
    render: () => <SettingsOBSHost />,
  },
  {
    id: "twitch",
    icon: Twitch,
    label: "Twitch",
    route: Routes.SETTINGS_TWITCH,
    render: () => <SettingsStreamTemplates />,
  },
  {
    id: "user",
    icon: User,
    label: "User Settings",
    route: Routes.SETTINGS_USER,
    render: () => <SettingsUser />,
  },
];

export default SETTINGS_ROUTES;
