/* eslint-disable no-console */
const { execSync } = require('child_process');

function isDry() {
  return process.argv.includes('--dry-run');
}

function getLocalRepoUrl() {
  const dir = execSync('git rev-parse --show-toplevel').toString().trim();
  return `file://${dir}/.git`;
}

function getCurrentBranch() {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

function dryRunConfig() {
  return {
    repositoryUrl: getLocalRepoUrl(),
    branches: getCurrentBranch(),
    npmPublish: false,
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      [
        '@semantic-release/exec',
        {
          generateNotesCmd:
            // eslint-disable-next-line no-template-curly-in-string
            'echo The release will update from ${lastRelease.version} to ${nextRelease.version}',
        },
      ],
    ],
  };
}

function ciConfig() {
  return {
    branches: 'master',
    npmPublish: false,
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/github',
      [
        '@semantic-release/exec',
        {
          // Works for github actions
          // eslint-disable-next-line no-template-curly-in-string
          publishCmd: 'echo ::set-output name=nextVer::${nextRelease.version}',
        },
      ],
    ],
  };
}

function main() {
  if (isDry()) {
    console.log('Dry run started');
    return dryRunConfig();
  }

  return ciConfig();
}

module.exports = main();
