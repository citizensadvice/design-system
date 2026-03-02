import path from "node:path";
import { fileURLToPath } from "node:url";

import simpleGit from "simple-git";

import pkg from "../package.json" with { type: "json" };

export const packageName = `@citizensadvice/design-system`;

export const packageVersion = pkg.version;

export const packageRoot = path.join(fileURLToPath(import.meta.url), "../..");

export function exitWithError(err) {
  console.log(err);
  process.exit(1);
}

export function exitWithoutPublishing() {
  console.log("Exiting without publishing");
  process.exit(1);
}

export async function checkRepoStatus() {
  const git = simpleGit(packageRoot);

  try {
    const status = await git.status();

    if (status.current !== "main") {
      exitWithError(`You must be in the main branch to release`);
    }

    if (status.ahead !== 0) {
      exitWithError(`Your repo has changes not pushed to remote.`);
    }

    if (!status.isClean()) {
      exitWithError(`Your have uncommitted changes in your repo.`);
    }
  } catch (gitErr) {
    exitWithError(gitErr);
  }
}
