#!/usr/bin/env node

const { promisify } = require('util');
const { readJson, writeFile } = require('fs-extra');
const { exec } = require('child_process');
const path = require('path');
const semver = require('semver');
const { default: dedent } = require('ts-dedent');

const rootDirectory = path.join(__dirname, '..', '..', '..');

const logger = console;

const getMonorepoPackages = async () => {
  const process = promisify(exec);
  const contents = await process('yarn lerna ls --json', {
    cwd: rootDirectory,
  });

  const projects = JSON.parse(contents.stdout);
  return projects.reduce((acc, project) => {
    acc[project.name] = path.join(project.location, 'package.json');
    return acc;
  }, []);
};

const run = async () => {
  const updatedVersion = process.argv[process.argv.length - 1];

  if (!semver.valid(updatedVersion)) throw new Error(`Invalid version: ${updatedVersion}`);

  logger.log(`Generating versions.ts with v${updatedVersion}`);

  const storybookPackages = await getMonorepoPackages();

  const packageToVersionMap = (
    await Promise.all(
      Object.keys(storybookPackages).map(async (pkgName) => {
        const { name, version } = await readJson(storybookPackages[pkgName]);

        return {
          name,
          version,
        };
      })
    )
  )
    .filter(({ name }) => /^(@storybook|sb$|storybook$)/.test(name))
    // As some previous steps are asynchronous order is not always the same so sort them to avoid that
    .sort((package1, package2) => package1.name.localeCompare(package2.name))
    .reduce((acc, { name }) => ({ ...acc, [name]: updatedVersion }), {});

  const versionsPath = path.join(__dirname, '..', 'src', 'versions.ts');

  await writeFile(
    versionsPath,
    dedent`
      // auto generated file, do not edit
      export default ${JSON.stringify(packageToVersionMap, null, 2)}
    `
  );

  logger.log(`Updating versions and formatting results at: ${versionsPath}`);

  exec(`yarn lint:js:cmd --fix ${versionsPath}`, {
    cwd: path.join(__dirname, '..', '..', '..'),
  });
};

run().catch((e) => {
  logger.error(e);
  process.exit(1);
});
