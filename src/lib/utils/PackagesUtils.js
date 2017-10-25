// @flow
import fs from "fs";
import path from "path";
import {exec} from "child_process";

/**
 * Resolve a dependency's `package.json` content from a specified directory.
 *
 * @param  {string}           dir
 * @return {Promise<Object>}
 */
export function getPackageData(dir: string): Promise<Object> {
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
 * Tries to execute a prepare script from NPM in a specified package.
 *
 * @param   {string}                  directory
 * @return  {Promise<string|Buffer>}
 */
export function preparePackage(directory: string): Promise<string|Buffer> {
  return new Promise((resolve) => {
    exec("npm run prepare", {
      cwd: directory,
    }, (error, stdout) => {
      resolve(stdout);
    });
  });
}

/**
 * Tries to install dependencies from NPM for a specified package.
 *
 * @param   {string}                  directory
 * @return  {Promise<string|Buffer>}
 */
export function installDependencies(directory: string): Promise<string|Buffer> {
  return new Promise((resolve) => {
    exec("npm install", {
      cwd: directory,
    }, (error, stdout) => {
      resolve(stdout);
    });
  });
}
