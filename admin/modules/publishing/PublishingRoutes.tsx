import * as React from "react";
import { AlignLeft, Mail } from "react-feather";

import { Routes } from "../../Constants";
import { DashboardSidebarRoute } from "../dashboards/DashboardSidebar";
import ArticleEditor from "./ArticleEditor";
import ArticlesIndex from "./ArticlesIndex";
import EditArticle from "./EditArticle";
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
    showLink: false,
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
  {
    id: "articles",
    icon: AlignLeft,
    label: "Articles",
    route: Routes.PUBLISHING_ARTICLES,
    exact: true,
    render: () => <ArticlesIndex />,
  },
  {
    id: "new-article",
    showLink: false,
    label: "New Article",
    route: Routes.PUBLISHING_ARTICLES_NEW,
    render: () => <ArticleEditor />,
  },
  {
    id: "edit-article",
    label: "New Article",
    showLink: false,
    route: Routes.PUBLISHING_ARTICLES_EDIT(":id"),
    render: ({ match }) => <EditArticle articleId={match.params.id} />,
  },
];

export default PUBLISHING_ROUTES;
