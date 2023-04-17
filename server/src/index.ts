import app from "./app.js";
import config from "./config/index.js";
import { setupSpfxConnection } from "./services/sharePoint.js";

(async function() {
  try {
    app.on("error", (err) => {
      console.log("ERROR: ", err);
      throw err;
    });

    //connecting to sharepoint
    setupSpfxConnection();

    const onListening = () => {
      console.log(`Listening on ${config.PORT}`);
    };

    app.listen(config.PORT, onListening);
   
  } catch (err) {
    console.log("ERROR ", err);
    throw err;
  }
})();
