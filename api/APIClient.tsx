import * as interviews from "./routes/interviews";
import * as schedules from "./routes/schedules";
import * as runs from "./routes/runs";

export default {
  ...interviews,
  ...schedules,
  ...runs,
};
