import * as React from "react";
import { Routes } from "../../Constants";
import { Twitch, Settings, Airplay } from "react-feather";

import SettingsGeneral from "./SettingsGeneral";
import SettingsOBSHost from "./SettingsOBSHost";
import SettingsStreamTemplates from "./SettingsStreamTemplates";

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
        <Settings size={16} strokeWidth="2" style={{ marginRight: 8 }} /> General
      </>
    ),
    route: Routes.SETTINGS,
    exact: true,
    render: () => <SettingsGeneral />,
  },
  {
    id: "obs",
    label: (
      <>
        <Airplay size={16} strokeWidth="2" style={{ marginRight: 8 }} /> OBS Remote
      </>
    ),
    route: Routes.SETTINGS_OBS,
    render: () => <SettingsOBSHost />,
  },
  {
    id: "twitch",
    label: (
      <>
        <Twitch size={16} strokeWidth="2" style={{ marginRight: 8 }} /> Twitch
      </>
    ),
    route: Routes.SETTINGS_TWITCH,
    render: () => <SettingsStreamTemplates />,
  },
];

export default SETTINGS_ROUTES;
