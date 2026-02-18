import { config } from "dotenv";
config({ path: [".env"] });
import { connect } from "mongoose";
import server from "./app.js";

const PORT = 4000;

(async function () {
  try {
    await connect(process.env.DB_CONN);
    console.log("DB connection succeed");
  } catch (err) {
    console.log(err.message);
  }
})();

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
