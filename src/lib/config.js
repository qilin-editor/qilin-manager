// @flow
import {resolve} from "path";
import {home} from "./utils/FilesUtils";

export const env: Object = process.env;
export const dest: string = env["QPM_HOME"] || resolve(home, "./.qpm/");
export const proxy: string = env["QPM_PROXY"];
