const core = require("@actions/core");
const { exec } = require("@actions/exec");
const github = require("@actions/github");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");

const meta = { dist_interface: "github-actions" };
process.env["DOC_DETECTIVE_META"] = JSON.stringify(meta);

const repoOwner = github.context.repo.owner;
const repoName = github.context.repo.repo;
const runId = process.env.GITHUB_RUN_ID;
const runURL = `https://github.com/${repoOwner}/${repoName}/actions/runs/${runId}`;

main();

async function main() {
  try {
    // Post warning if running on Linux
    if (os.platform() === "linux") {
      core.warning(
        "On Ubuntu runners, this action only supports headless mode. Firefox and Chrome contexts automatically fall back to headless mode when necessary. If your tests doesn't work in headless mode (like if you need the 'record' step), use macOS or Windows runners."
      );
    }
    // Get the inputs
    const version = core.getInput("version");
    const dd = `doc-detective@${version}`;
    const cwd = core.getInput("working_directory");
    const config = core.getInput("config");
    const input = core.getInput("input");

    // Compile command
    let compiledCommand = `npx ${dd}`;
    // If v2, add the 'runTests' command
    if (version.startsWith("2")) {
      compiledCommand += " runTests";
    }
    // Add the options
    if (config) compiledCommand += ` --config ${config}`;
    if (input) compiledCommand += ` --input ${input}`;
    const outputPath = path.resolve(
      process.env.RUNNER_TEMP,
      "doc-detective-output.json"
    );
    compiledCommand += ` --output ${outputPath}`;

    // Run Doc Detective
    core.info(`Running Doc Detective: ${compiledCommand}`);
    core.info(`Working directory: ${cwd}`);

    let commandOutputData = "";
    const options = {
      // Full options: https://github.com/actions/toolkit/blob/d9347d4ab99fd507c0b9104b2cf79fb44fcc827d/packages/exec/src/interfaces.ts
      cwd,
    };
    options.listeners = {
      stdout: (data) => {
        commandOutputData += data.toString();
      },
    };
    await exec(compiledCommand, [], options);
    const outputFiles = commandOutputData.split("results at ");
    const outputFile = outputFiles[outputFiles.length - 1].trim();
    // If output file is not found, throw an error
    if (!outputFile) {
      throw new Error(
        `Output file not found.\nOutput file: ${outputFile}\nCWD: ${process.cwd()}\nstdout: ${
          commandOutputData
        }`
      );
    }

    // Set outputs
    const results = require(outputFile);
    core.setOutput("results", results);

    // Create a pull request if there are changed files
    if (core.getInput("create_pr_on_change") == "true") {
      core.info("Checking for changed files.");
      // Check if git is available
      let hasGit;
      try {
        const gitVersionCheck = execSync("git --version");
        if (gitVersionCheck.toString()) hasGit = true;
      } catch (error) {
        core.warning("Git isn't available. Skipping change checking.");
      }

      if (hasGit) {
        let changedFiles;

        // Check if there are changed files
        try {
          const statusResponse = execSync("git status");
          const status = statusResponse.toString();
          if (!status.includes("working tree clean")) changedFiles = true;
          if (status.includes("not a git repository")) {
            core.warning(
              `${process.cwd()} isn't a git repository. Skipping change checking.`
            );
          }
        } catch (error) {
          core.warning(`Error checking for changed files: ${error.message}`);
        }

        if (changedFiles) {
          core.info("Changed files found.");
          core.info(`Git status: ${status}`);

          // Create a pull request if there are changed files
          try {
            const pr = await createPullRequest(status);
            core.setOutput("pull_request_url", pr.data.html_url);
            core.info(`Pull Request: ${JSON.stringify(pr)}`);
          } catch (error) {
            core.error(`Error creating pull request: ${error.message}`);
          }
        }
      }
    }

    // Create an issue if there are failing tests
    if (results.summary.specs.fail > 0) {
      if (core.getInput("create_issue_on_fail") == "true") {
        // Create an issue if there are failing tests
        try {
          const issue = await createIssue(JSON.stringify(results, null, 2));
          core.setOutput("issue_url", issue.data.html_url);
          core.info(`Issue: ${JSON.stringify(issue)}`);
        } catch (error) {
          core.error(`Error creating issue: ${error.message}`);
        }
      }
      if (core.getInput("exit_on_fail") == "true") {
        // Fail the action if there are failing tests
        core.setFailed("Doc Detective found failing tests.");
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

/**
 * Creates an issue using the provided inputs.
 *
 * @param {string} results - The results to be included in the issue body.
 * @returns {Promise<object>} - A promise that resolves to the created issue object.
 */
async function createIssue(results) {
  const token = core.getInput("token");
  const title = core.getInput("issue_title");
  const body = core
    .getInput("issue_body")
    .replace("$RUN_URL", runURL)
    .replace("$RESULTS", `\n\n\`\`\`json\n${results}\n\`\`\``);
  const labels = core.getInput("issue_labels");
  const assignees = core.getInput("issue_assignees");

  const octokit = github.getOctokit(token);

  const issue = await octokit.rest.issues.create({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    title,
    body,
    labels: labels.split(","),
    assignees: assignees.split(","),
  });

  core.info(`Issue created: ${issue.data.html_url}`);
  core.setOutput("issueUrl", issue.data.html_url);
  return issue;
}

/**
 * Creates a pull request with the specified parameters.
 *
 * @returns {Promise<object>} - A promise that resolves when the pull request is created.
 */
async function createPullRequest() {
  const token = core.getInput("token");
  const title = core.getInput("pr_title");
  const body = core.getInput("pr_body").replace("$RUN_URL", runURL);
  const labels = core.getInput("pr_labels");
  const reviewers = core.getInput("pr_reviewers");
  const assignees = core.getInput("pr_assignees");
  const base = execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .replace("\n", "");
  const head = core.getInput("pr_branch") || `doc-detective-${Date.now()}`;

  const octokit = github.getOctokit(token);

  // Infer user email and name
  const userName = process.env.GITHUB_ACTOR;
  const userEmail = `${userName}@users.noreply.github.com`;

  // Configure git with user email and name
  await exec(`git config --global user.email "${userEmail}"`);
  await exec(`git config --global user.name "${userName}"`);

  // Create new branch
  core.info(`Creating branch: ${head}`);
  await exec(`git checkout -b ${head}`);

  // Commit changes
  await exec("git add .");
  await exec(`git commit -m "Doc Detective results"`);
  await exec(`git push origin ${head}`);

  // Create pull request
  try {
    core.info(`Creating pull request.`);
    const pr = await octokit.rest.pulls.create({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      title,
      body,
      head,
      base,
    });

    // Add labels, reviewers, and assignees
    core.info(`Adding labels.`);
    await octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/labels",
      {
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number: pr.data.number,
        labels: labels.split(","),
      }
    );
    core.info(`Adding assignees.`);
    await octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/assignees",
      {
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number: pr.data.number,
        assignees: assignees.split(","),
      }
    );
    core.info(`Adding reviewers.`);
    await octokit.request(
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
      {
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        pull_number: pr.data.number,
        reviewers: reviewers.split(","),
      }
    );
  } catch (error) {
    if (error.status === 403) {
      core.error(
        "Doc Detective doesn't have permissions to create pull requests. Make sure the workflow or job has write permissions for pull requests and that you've allowed GitHub Actions to create pull requests."
      );
    } else {
      throw core.error(error);
    }
  }

  return pr;
}
