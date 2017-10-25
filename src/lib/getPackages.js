// @flow
import {join} from "path";
import {readdirSync} from "fs";
import {isDirectory} from "./utils/FilesUtils";
import {getPackageData} from "./utils/PackagesUtils";

/**
 * Asynchronously returns a list of installed packages in `dest` directory. The
 * returned list is an object whose keys correspond to packages names and values
 * to theirs respective versions:
 * - `name` field is the same as in package.json
 * - `version` field is the same as in package.json
 *
 * @example
 *  > Manager.getPackages();
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

export default function(dest: string): () => Promise<Object> {
  const files = readdirSync(dest).map((name) => join(dest, name));
  const dirs = files.filter(isDirectory);

  return async function(): Promise<Object> {
    const versions = {};
    const promises = [];
    dirs.forEach((dir) => promises.push(getPackageData(dir)));

    try {
      const packs = await Promise.all(promises);
      packs.forEach((pack) => versions[pack.repository] = pack.version);
    } catch (error) {/* … */}

    return versions;
  };
}
