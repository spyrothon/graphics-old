import * as auth from "./routes/auth";
import * as init from "./routes/init";
import * as interviews from "./routes/interviews";
import * as schedules from "./routes/schedules";
import * as runs from "./routes/runs";

export default {
  ...auth,
  ...init,
  ...interviews,
  ...schedules,
  ...runs,
};
