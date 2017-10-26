// @flow
import fs from "fs";
import path from "path";

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
 * Check whether a path is pointing to a valid package or not.
 *
 * @param   {string}  source
 * @return  {boolean}
 */
export function isPackage(source: string): boolean {
  return fs.existsSync(path.join(source, "package.json"));
}

/**
 * Resolve a dependency's `package.json` content from a specified directory.
 *
 * @param  {string}           dir
 * @return {Promise<Object>}
 */
export function readPackage(dir: string): Promise<Object> {
  const target:string = path.basename(path.dirname(dir));
  const file:string = path.resolve(dir, "package.json");

  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }

      try {
        const packageData = JSON.parse(data);
        packageData.target = target;
        packageData.path = file;

        resolve(packageData);
      } catch (error) {
        reject(error);
      }
    });
  });
}

/**
 * Return the home directory depending on platform.
 *
 * @type  {string}
 */
export const home: string = process.env[
  (process.platform === "win32") ? "USERPROFILE" : "HOME"
] || "";
