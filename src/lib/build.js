// @flow
import {debug as debugModule} from "debug";
import {spawn} from "child_process";
import {readPackage} from "./utils/FilesUtils";

// For debug purpose only:
const debug = debugModule("qilin:build");

/**
 * Scripts which should be executed in order to build a dependency.
 *
 * @see   https://docs.npmjs.com/misc/scripts
 * @type  {Array}
 */
export const LIFECYCLE_SCRIPTS = [
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

  debug(`Executing "${command}" for ${depName}`);

  return new Promise((resolve, reject) => {
    const build = spawn(command, {
      cwd: directory,
      env: {...process.env, NODE_ENV: "development"},
      shell: true,
    });

    build.on("close", (code) => {
      debug(`Terminated "${script}" for ${depName} with code ${code}`);

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
 * order to build the package.
 *
 * Scripts are executes in the order below:
 * 1. install
 * 2. postinstall
 * 3. prepare
 *
 * @example
 *  Manager.build("path/to/package_A")
 *  Manager.build("path/to/package_B")
 *
 * @param   {string}  directory
 * @async
 */
export default async function(directory: string): Promise<*> {
  const data = await readPackage(directory);
  const init = await execute(directory, "install");

  if (init) {
    debug(`Installed dependencies for ${data.name}`);
  }

  for (let script of LIFECYCLE_SCRIPTS) {
    if (script in data.scripts) {
      await execute(directory, script);
    }
  }
}
