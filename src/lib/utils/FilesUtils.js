// @flow
import fs from "fs";

/**
 * Check whether a path is pointing to a directory or not.
 *
 * @param   {string}  source
 * @return  {boolean}
 */
export function isDirectory(source: string): boolean {
  return fs.lstatSync(source).isDirectory();
}

/**
 * Return the home directory depending on platform.
 *
 * @return {string}
 */
export function getHomeDir(): string {
  return (
    process.env[(process.platform === "win32") ? "USERPROFILE" : "HOME"] || ""
  );
}
