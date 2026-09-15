import { fileURLToPath } from "node:url";
import { runCli } from "./cli/run-cli.js";

const templateRoot = fileURLToPath(new URL("../templates", import.meta.url));

await runCli(process.argv.slice(2), templateRoot);
