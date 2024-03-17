import { PiniaLogger } from "pinia-logger";

const piniaLogger = PiniaLogger({
  expanded: true,
  logErrors: true,
  disabled: import.meta.env.MODE !== "development",
});


export default piniaLogger;