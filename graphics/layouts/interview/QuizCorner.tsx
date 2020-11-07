import * as React from "react";

import { useSafeSelector } from "../../Store";
import InterviewStore from "../../modules/interviews/InterviewStore";
import Omnibar from "../../modules/omnibar/Omnibar";
import ScheduleStore from "../../modules/schedules/ScheduleStore";
import QuizCornerCurrentQuestion from "../../modules/quiz-corner/QuizCornerCurrentQuestion";
import QuizCornerScores from "../../modules/quiz-corner/QuizCornerScores";
import Layout from "../../uikit/Layout";

import styles from "./QuizCorner.mod.css";

export default function QuizCorner() {
  const currentInterview = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return InterviewStore.getInterview(state, { interviewId: entry.interviewId });
  });

  return (
    <Layout>
      <div className={styles.quizContainer}>
        <QuizCornerCurrentQuestion
          className={styles.currentQuestion}
          interview={currentInterview}
        />
        <QuizCornerScores className={styles.scores} interview={currentInterview} />
      </div>
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
