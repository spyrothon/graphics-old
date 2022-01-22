import * as React from "react";
import Helmet from "react-helmet";

type PublicHelmetProps = {
  className?: string;
};

export default function PublicHelmet(props: PublicHelmetProps) {
  const { className } = props;
  return (
    <Helmet>
      <title>Spyrothon</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className={className} />
    </Helmet>
  );
}
