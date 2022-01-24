import * as React from "react";
import { Remark } from "react-remark";

import APIClient from "@api/APIClient";
import { Article as ArticleType, Newsletter as NewsletterType } from "@api/APITypes";
import FixedWidthLayout from "../layouts/FixedWidthLayout";
import Header from "@uikit/Header";
import Text from "@uikit/Text";

interface ArticleProps {
  article: ArticleType;
}

function Article(props: ArticleProps) {
  const { article } = props;

  return (
    <section>
      <Header>{article.title}</Header>
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
      <Header size={Header.Sizes.H1}>{newsletter.title}</Header>
      <Text>Published {newsletter.publishedAt?.toLocaleDateString()}</Text>

      <Remark>{newsletter.introduction}</Remark>

      {newsletter.articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </FixedWidthLayout>
  );
}
