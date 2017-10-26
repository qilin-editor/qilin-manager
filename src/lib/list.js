// @flow
import {readdirSync} from "fs";
import {join, resolve} from "path";
import {isDirectory, isPackage, readPackage} from "./utils/FilesUtils";

/**
 * Returns an array of paths pointing to packages (each package must contain a
 * `package.json` file).
 *
 * @param   {string}        directory
 * @return  {Array<string>}
 */
export function findPackages(directory: string): Array<string> {
  let output = [];
  try {
    output = readdirSync(directory)
      .map((name) => join(directory, name))
      .filter(isDirectory)
      .filter(isPackage);
  } catch (error) {/* … */}

  return output;
}

/**
 * Asynchronously returns a list of installed packages in `dest` directory. The
 * returned list is an object whose keys correspond to packages names and values
 * to theirs respective versions:
 * - `name` field is the same as in package.json
 * - `version` field is the same as in package.json
 *
 * @example
 *  > Manager.list("directory");
 *  < {
 *      "packageA": "version",
 *      "packageB": "version",
 *      "packageC": "version",
 *    }
 *
 * @param   {string}  dest
 * @return  {Promise}
 * @async
 */

export default function(dest: string): (directory: string) => Promise<Object> {
  return async function(directory: string = ""): Promise<Object> {
    const source = resolve(dest, directory);
    const output = {};

    for (const pkg of findPackages(source)) {
      const data = await readPackage(pkg);
      output[data.legacyName] = data.version;
    }

    return output;
  };
}
