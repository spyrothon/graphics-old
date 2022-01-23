import * as React from "react";
import { Mail, PlusCircle } from "react-feather";

import { Routes } from "../../Constants";
import { DashboardSidebarRoute } from "../dashboards/DashboardSidebar";
import EditNewsletter from "./EditNewsletter";
import NewsletterEditor from "./NewsletterEditor";
import NewslettersIndex from "./NewslettersIndex";

const PUBLISHING_ROUTES: DashboardSidebarRoute[] = [
  {
    id: "general",
    icon: Mail,
    label: "Newsletters",
    route: Routes.PUBLISHING,
    exact: true,
    render: () => <NewslettersIndex />,
  },
  {
    id: "new-newsletter",
    icon: PlusCircle,
    label: "New Newsletter",
    route: Routes.PUBLISHING_NEWSLETTERS_NEW,
    render: () => <NewsletterEditor />,
  },
  {
    id: "edit-newsletter",
    label: "Edit Newsletter",
    showLink: false,
    route: Routes.PUBLISHING_NEWSLETTERS_EDIT(":id"),
    render: ({ match }) => <EditNewsletter newsletterId={match.params.id} />,
  },
];

export default PUBLISHING_ROUTES;
