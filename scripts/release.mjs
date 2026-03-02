import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

import { confirm, select } from "@inquirer/prompts";
import chalk from "chalk";
import semver from "semver";
import simpleGit from "simple-git";

import {
  packageVersion,
  packageName,
  packageRoot,
  checkRepoStatus,
  exitWithError,
  exitWithoutPublishing,
} from "./releaseHelpers.mjs";

function getChoices() {
  const packageSemver = semver.parse(packageVersion);

  return [
    packageSemver.inc("patch").toString(),
    packageSemver.inc("minor").toString(),
    packageSemver.inc("major").toString(),
  ];
}

function updateVersionNumber(newVersion) {
  console.log(chalk.blue.dim(`Updating version number to ${newVersion}`));
  execSync(`npm --no-git-tag-version version ${newVersion}`);
  console.log(chalk.green(`Updated version number to ${newVersion}`));
}

function writeNewChangelog(newVersion) {
  const changelogPath = path.join(packageRoot, "CHANGELOG.md");
  const changelog = fs.readFileSync(changelogPath, "utf8");

  const publishDate = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
  }).format(new Date());

  // Add the new entry
  const changelogEntry = `## v${newVersion}\n\n### ${publishDate}`;
  const newChangelog = `${changelogEntry}\n\n${changelog}`;
  fs.writeFileSync(changelogPath, newChangelog, "utf8");
  console.log(chalk.green(`Changelog updated`));
}

await checkRepoStatus(packageRoot);

try {
  const changelogUpdated = await confirm({
    message: "Have you updated the changelog?",
    default: false,
  });

  if (!changelogUpdated) {
    exitWithoutPublishing();
  }

  const choices = getChoices();

  console.log(
    `The latest published version of ${packageName} is currently ${chalk.bold(
      packageVersion,
    )}`,
  );

  const newVersion = await select({
    message: `Do you want to bump ${packageName} from v${packageVersion} to`,
    choices,
  });

  const confirmation = await confirm({
    message: `You chose to release: ${packageName}@${newVersion}. Is this correct?`,
    default: false,
  });

  if (!confirmation) {
    exitWithoutPublishing();
  }

  const newVersionBranch = `release/v${newVersion}`;
  const git = simpleGit(packageRoot);

  try {
    await git.checkoutBranch(newVersionBranch, "HEAD");

    updateVersionNumber(newVersion);
    writeNewChangelog(newVersion);

    console.log(chalk.green.bold("Release prepared."));

    const confirmCommit = await confirm({
      message: "Do you want to commit the changes and prepare the branch?",
      default: false,
    });

    if (!confirmCommit) {
      exitWithoutPublishing();
    }

    await git
      .add(".")
      .commit(`Release v${newVersion}`)
      .push("origin", newVersionBranch);

    console.log(
      chalk.green(
        `Changes committed and pushed. You must now create a pull request for branch v${newVersion}.`,
      ),
    );
  } catch (gitErr) {
    exitWithError(gitErr);
  }
} catch (error) {
  if (error instanceof Error && error.name === "ExitPromptError") {
    exitWithoutPublishing();
  } else {
    throw error;
  }
}
