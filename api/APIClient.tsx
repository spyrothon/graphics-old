import * as auth from "./routes/auth";
import * as init from "./routes/init";
import * as interviews from "./routes/interviews";
import * as schedules from "./routes/schedules";
import * as runs from "./routes/runs";
import * as transitions from "./routes/transitions";

export default {
  ...auth,
  ...init,
  ...interviews,
  ...runs,
  ...schedules,
  ...transitions,
};
