// @flow
import {debug as debugModule} from "debug";
import list from "./list";
import install from "./install";
import * as config from "../config";
import {getRepositoryPackage} from "../utils/GitHubUtils";

// For debug purpose only:
const log: Function = debugModule("qilin:update");

/**
 * Fetches new versions directly from GitHub for a package list.
 *
 * @param   {Object}  packages
 * @return  {Promise<Array<Object>>}
 * @async
 */
export function getNewVersions(packages: Object): Promise<Array<Object>> {
  return Promise.all(
    Object.keys(packages).map((id) => (
      getRepositoryPackage(id, config)
    ))
  );
}

/**
 * Asynchronously checks if locally installed packages under a certain namespace
 * are up-to-date. If no, they are downloaded again.
 *
 * @example
 *  qpm.update("plugins").then(…);
 *  qpm.update("themes").then(…);
 *  qpm.update().then(…);
 *
 * @param   {?string}   namespace
 * @return  {Promise<*>}
 * @async
 */
export default async function(namespace?: string): Promise<*> {
  const download = [];
  const packages = await list(namespace);
  const external = await getNewVersions(packages);

  external.forEach((e) => {
    if (e.version !== packages[e.repository].version) {
      // eslint-disable-next-line
      log(`Updating ${e.repository}: ${packages[e.repository].version} => ${e.version}`);

      download.push(install(e.repository));
    }
  });

  return Promise.all(download);
}
