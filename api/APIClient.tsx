import * as init from "./routes/init";
import * as interviews from "./routes/interviews";
import * as schedules from "./routes/schedules";
import * as runs from "./routes/runs";

export default {
  ...init,
  ...interviews,
  ...schedules,
  ...runs,
};
