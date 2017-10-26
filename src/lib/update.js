// @flow
import {debug as debugModule} from "debug";
import listPackages from "./list";
import installPackage from "./install";
import {getRepositoryPackage} from "./utils/GitHubUtils";

// For debug purpose only:
const log = debugModule("qilin:update");

export function getNewVersions(
  packages: Object,
  config: Object
): Promise<Array<*>> {
  return Promise.all(
    Object.keys(packages).map((id) => (
      getRepositoryPackage(id, config)
    ))
  );
}

/**
 * Asynchronously checks if locally installed packages are up-to-date. If no,
 * those packages are fetched again.
 *
 * @example
 *  Manager.update("plugins");
 *  Manager.update("themes");
 *  Manager.update();
 *
 * @param   {object}  config
 * @return  {void}
 * @async
 */

export default function(config: Object): (directory: string) => Promise<*> {
  const list = listPackages(config.dest);
  const install = installPackage(config);

  return async function(directory: string): Promise<*> {
    const download = [];
    const packages = await list(directory);
    const external = await getNewVersions(packages, config);

    external.forEach((e) => {
      if (e.version !== packages[e.repository]) {
        // eslint-disable-next-line
        log(`Updating ${e.repository}: ${packages[e.repository]} => ${e.version}`);

        download.push(install(e.repository));
      }
    });

    return Promise.all(download);
  };
}
