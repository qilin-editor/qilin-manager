// @flow
import {spawn} from "child_process";
import {getPackageData} from "./utils/PackagesUtils";

export const LIFECYCLE_SCRIPTS = [
  "postinstall",
  "prepare",
];

/**
 * Executes a given NPM script in the specified directory.
 *
 * @param   {string}  directory
 * @param   {string}  script
 * @return  {Promise}
 */
export function execute(directory: string, script: string): Promise<*> {
  const command = (LIFECYCLE_SCRIPTS.indexOf(script) > -1)
    ? `npm run ${script}`
    : `npm ${script}`;

  return new Promise((resolve, reject) => {
    const build = spawn(command, {
      cwd: directory,
      env: process.env,
      shell: true,
    });

    build.on("close", (code) => {
      console.log(`Terminated ${script} for ${directory} with code ${code}`);
      resolve(code);
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
  const data = await getPackageData(directory);
  const init = await execute(directory, "install");

  if (init) {
    console.log(`Installed dependencies for ${directory}`);
  }

  for (let script of LIFECYCLE_SCRIPTS) {
    if (script in data.scripts) {
      await execute(directory, script);
    }
  }
}
