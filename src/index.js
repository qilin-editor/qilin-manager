// @flow
import fs from "fs";
import * as config from "./lib/config";
import load from "./lib/commands/load";
import list from "./lib/commands/list";
import build from "./lib/commands/build";
import update from "./lib/commands/update";
import install from "./lib/commands/install";

/**
 * Returns a bunch of commands for further usage. Creates a dest direectory if
 * it does not exist yet.
 *
 * @example
 *  const qpm = new QilinManager();
 *  qpm.install(…);
 *  qpm.update(…);
 *  qpm.list(…);
 *  qpm.load(…);
 *  qpm.build(…);
 *
 * @return  {object}
 */
export default function(): Object {
  if (!fs.existsSync(config.dest)) {
    fs.mkdirSync(config.dest);
  }

  return {install, update, list, load, build};
}
