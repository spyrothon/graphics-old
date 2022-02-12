import * as React from "react";
import { Remark } from "react-remark";

import APIClient from "@api/APIClient";
import { Article as ArticleType, Newsletter as NewsletterType } from "@api/APITypes";
import FixedWidthLayout from "../layouts/FixedWidthLayout";
import Header from "@uikit/Header";
import Text from "@uikit/Text";

import styles from "./Newsletter.mod.css";

interface ArticleProps {
  article: ArticleType;
}

function Article(props: ArticleProps) {
  const { article } = props;

  return (
    <section className={styles.article}>
      <Header id={article.id}>{article.title}</Header>
      <Remark>{article.content}</Remark>
    </section>
  );
}

interface NewsletterProps {
  newsletterId: string;
}

export default function Newsletter(props: NewsletterProps) {
  const { newsletterId } = props;
  const [newsletter, setNewsletter] = React.useState<NewsletterType | undefined>();

  React.useEffect(() => {
    (async () => {
      const newsletter = await APIClient.fetchNewsletter(newsletterId);
      setNewsletter(newsletter);
    })();
  }, [newsletterId]);

  if (newsletter == null) return null;

  return (
    <FixedWidthLayout>
      <div className={styles.container}>
        <main className={styles.newsletterContent}>
          <Header size={Header.Sizes.H1} marginless>
            {newsletter.title}
          </Header>
          <Text size={Text.Sizes.SIZE_20} color={Text.Colors.MUTED}>
            Published {newsletter.publishedAt?.toLocaleDateString()}
          </Text>

          <Remark>{newsletter.introduction}</Remark>

          {newsletter.articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </main>
        <aside className={styles.sidebar}>
          <Header size={Header.Sizes.H4} className={styles.sidebarHeader}>
            Articles
          </Header>
          <ul>
            {newsletter.articles.map((article) => (
              <li key={article.id}>
                <a href={`#${article.id}`}>{article.title}</a>
              </li>
            ))}
          </ul>

          <Header size={Header.Sizes.H4} className={styles.sidebarHeader}>
            Contact
          </Header>
          <p>If you have ideas for things we should write about next, let us know!</p>
          <ul>
            <li>
              Twitter: <a href="https://twitter.com/spyrothon">@spyrothon</a>
            </li>
            <li>
              Twitch: <a href="https://twitch.tv/spyrothon">Spyrothon</a>
            </li>
            <li>
              <a href="discord.gg/fCvfnfk">Discord</a>
            </li>
          </ul>

          <Header size={Header.Sizes.H4} className={styles.sidebarHeader}>
            Other Links
          </Header>
          <ul>
            <li>
              <a href="https://speedrun.com/spyro">Speedrun Leaderboards</a>
            </li>
            <li>
              <a href="https://discord.gg/spyrospeedrunning">Spyro Speedrunning Discord</a>
            </li>
          </ul>
        </aside>
      </div>
    </FixedWidthLayout>
  );
}
