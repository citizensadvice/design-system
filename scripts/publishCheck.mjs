import { confirm } from "@inquirer/prompts";
import {
  checkRepoStatus,
  packageRoot,
  packageVersion,
  exitWithoutPublishing,
} from "./releaseHelpers.mjs";

await checkRepoStatus(packageRoot);

const versionConfirmed = await confirm({
  message: `You are releasing version ${packageVersion}. Is this correct?`,
  type: "confirm",
  name: "confirmation",
  default: false,
});

if (!versionConfirmed) {
  exitWithoutPublishing();
}
