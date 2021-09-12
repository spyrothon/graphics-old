import * as React from "react";
import { Routes } from "../../Constants";
import { Twitch, Settings, Airplay, PlusCircle } from "react-feather";

import SettingsCreateSchedule from "./SettingsCreateSchedule";
import SettingsGeneral from "./SettingsGeneral";
import SettingsOBSHost from "./SettingsOBSHost";
import SettingsStreamTemplates from "./SettingsStreamTemplates";

const iconStyle = {
  marginRight: 8,
  marginBottom: -2,
};

interface SettingsRoute {
  id: string;
  label: React.ReactNode;
  route: typeof Routes[keyof typeof Routes];
  exact?: boolean;
  render: () => React.ReactNode;
}

const SETTINGS_ROUTES: SettingsRoute[] = [
  {
    id: "general",
    label: (
      <>
        <Settings size={18} strokeWidth="2" style={iconStyle} /> General
      </>
    ),
    route: Routes.SETTINGS,
    exact: true,
    render: () => <SettingsGeneral />,
  },
  {
    id: "create-schedule",
    label: (
      <>
        <PlusCircle size={18} strokeWidth="2" style={iconStyle} /> Create a Schedule
      </>
    ),
    route: Routes.SETTINGS_CREATE_SCHEDULE,
    render: () => <SettingsCreateSchedule />,
  },
  {
    id: "obs",
    label: (
      <>
        <Airplay size={18} strokeWidth="2" style={iconStyle} /> OBS Remote
      </>
    ),
    route: Routes.SETTINGS_OBS,
    render: () => <SettingsOBSHost />,
  },
  {
    id: "twitch",
    label: (
      <>
        <Twitch size={18} strokeWidth="2" style={iconStyle} /> Twitch
      </>
    ),
    route: Routes.SETTINGS_TWITCH,
    render: () => <SettingsStreamTemplates />,
  },
];

export default SETTINGS_ROUTES;
