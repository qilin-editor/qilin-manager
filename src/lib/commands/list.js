// @flow
import {readdirSync} from "fs";
import {join, resolve} from "path";
import * as config from "../config";
import {isDirectory, isPackage, readPackage} from "../utils/FilesUtils";

/**
 * Returns an array of paths pointing to packages (each package contain a
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
 * Asynchronously returns a list of installed packages in `dest` directory under
 * a given namespace. The returned list is an object whose keys correspond to
 * packages names and values are objects containing:
 * - `namespace`: plugin namespace;
 * - `directory`: plugin parent directory;
 * - `version`: same as in `package.json`;
 * - `package` : full path to `package.json`;
 *
 * @example
 *  > await qpm.list("some_namespace");
 *  < {
 *      "packageA": {
 *        "namespace": "some_namespace",
 *        "directory": "packageA-master",
 *        "version": "x.x.x",
 *        "package": "path/to/package.json"
 *      },
 *      "packageB": {
 *        "namespace": "some_namespace",
 *        "directory": "packageB-master",
 *        "version": "x.x.x",
 *        "package": "path/to/package.json"
 *      }
 *    }
 *
 * @param   {?string}   namespace
 * @return  {Promise<Object>}
 * @async
 */
export default async function(
  namespace?: string = ""
): Promise<Object> {
  const source = resolve(config.dest, namespace);
  const output = {};

  for (const pkg of findPackages(source)) {
    const data = await readPackage(pkg);

    output[data.moduleName] = {
      namespace: data.namepsace,
      directory: data.directory,
      version: data.version,
      package: data.path,
    };
  }

  return output;
}
