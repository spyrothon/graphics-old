import * as React from "react";
import FeedArea from "../../uikit/FeedArea";

type BingoBoardProps = React.ComponentProps<typeof FeedArea>;

export default function BingoBoard(props: BingoBoardProps) {
  return <FeedArea {...props} />;
}
