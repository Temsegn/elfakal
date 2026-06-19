import { createApp } from "./app.js";
import { config } from "./config/index.js";

const app = await createApp();

app.listen(config.port, "0.0.0.0", () => {
  console.log(`Elfakal API listening on port ${config.port}`);
});
