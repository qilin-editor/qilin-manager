// @flow
import path from "path";
import listPackages from "./lib/list";
import buildPackage from "./lib/build";
import updatePackage from "./lib/update";
import installPackage from "./lib/install";
import {home} from "./lib/utils/FilesUtils";

/**
 * Returns a bunch of pre-configured commands for further usage.
 *
 * @example
 *  const Manager = new QilinManager({
 *    // …
 *  });
 *
 *  Manager.install(…);
 *  Manager.update(…);
 *  Manager.list(…);
 *  Manager.build(…);
 *
 * @param   {Object}  options
 * @param   {string}  options.dest?
 * @param   {string}  options.proxy?
 * @param   {boolean} options.extract?
 * @return  {object}
 */
export default function(options: Object = {}): Object {
  const config: Object = {
    dest: path.resolve(home, "./.qilin/"),
    extract: true,
    ...options,
  };

  return {
    install: installPackage(config),
    update: updatePackage(config),
    list: listPackages(config.dest),
    build: buildPackage,
  };
}
