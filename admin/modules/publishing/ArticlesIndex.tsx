import * as React from "react";

import { Article } from "@api/APITypes";
import { Routes } from "@admin/Constants";
import { useSafeSelector } from "@admin/Store";
import useSafeDispatch from "@admin/hooks/useDispatch";
import Anchor from "@uikit/Anchor";
import Header from "@uikit/Header";
import Text from "@uikit/Text";
import { fetchArticles } from "./PublishingActions";
import * as PublishingStore from "./PublishingStore";

import styles from "./NewslettersIndex.mod.css";
import NavLink from "@uikit/NavLink";

interface ArticlePreviewProps {
  article: Article;
}

function ArticlePreview(props: ArticlePreviewProps) {
  const { article } = props;

  return (
    <div className={styles.preview}>
      <Header>{article.title}</Header>
      <Text className={styles.previewTitle}>{article.content}</Text>
      <div className={styles.previewExtra}>
        {article.publishedAt != null ? (
          <Text marginless>Published {article.publishedAt.toDateString()}</Text>
        ) : null}
        <Text marginless>Updated {article.updatedAt.toDateString()}</Text>
        <Anchor href={Routes.PUBLISHING_ARTICLES_EDIT(article.id)} className={styles.editButton}>
          Edit
        </Anchor>
      </div>
    </div>
  );
}

export default function ArticlesIndex() {
  const dispatch = useSafeDispatch();
  const articles = useSafeSelector(PublishingStore.getArticles);

  React.useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <div className={styles.container}>
      <NavLink route={Routes.PUBLISHING_ARTICLES_NEW} label="New Article" />
      {articles.map((article) => (
        <ArticlePreview article={article} key={article.id} />
      ))}
    </div>
  );
}
