// @flow
import {debug as debugModule} from "debug";
import {spawn} from "child_process";
import {readPackage} from "../utils/FilesUtils";

// For debug purpose only:
const log: Function = debugModule("qilin:build");

/**
 * Scripts which should be executed in order to build a dependency.
 *
 * @see   https://docs.npmjs.com/misc/scripts
 * @type  {Array<string>}
 */
export const LIFECYCLE_SCRIPTS: Array<string> = [
  // We can ignore those as they are triggered automatically after `npm install`
  // "preinstall",
  // "prepare",
  // "postinstall",
];

/**
 * Executes a given NPM script in a specified directory.
 *
 * @param   {string}  directory
 * @param   {string}  script
 * @return  {Promise<number>}
 */
export function execute(directory: string, script: string): Promise<number> {
  const depName = directory.split("/").pop();
  const command = (LIFECYCLE_SCRIPTS.indexOf(script) > -1)
    ? `npm run ${script}`
    : `npm ${script}`;

  log(`Executing "${command}" for ${depName}`);

  return new Promise((resolve, reject) => {
    const build = spawn(command, {
      cwd: directory,
      env: {...process.env, NODE_ENV: "development"},
      shell: true,
    });

    build.on("close", (code) => {
      log(`Terminated "${script}" for ${depName} with code ${code}`);

      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}

/**
 * Installs dependencies for a given package and executes several NPM scripts in
 * order to build the plugin.
 *
 * Scripts are executes in the order below:
 * 1. preinstall
 * 2. install
 * 3. postinstall
 * 4. prepare
 *
 * @example
 *  qpm.build("path/to/package_A");
 *  qpm.build("path/to/package_B");
 *
 * @param   {string}  directory
 * @async
 */
export default async function(directory: string): Promise<void> {
  const data = await readPackage(directory);
  const init = await execute(directory, "install");

  if (init) {
    log(`Installed dependencies for ${data.name}`);
  }

  for (let script of LIFECYCLE_SCRIPTS) {
    if (script in data.scripts) {
      await execute(directory, script);
    }
  }
}
