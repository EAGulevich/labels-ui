import ncp from "ncp";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = path.join(__dirname, "../labels-server/src/shared-types");
const destination = path.join(__dirname, "./src/sharedTypesFromServer");

ncp(source, destination, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("Types copied successfully!");
});
