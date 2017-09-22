import path from "path";
import * as FilesUtils from "./lib/utils/FilesUtils";

export default function (options = {}) {
    const config = {
        dest: path.resolve(FilesUtils.getHomeDir(), "./.qilin/"),
        proxy: "",
        extract: true,
        ...options
    };

    return {
        install: require("./lib/installPackage")(config),
        update: require("./lib/updatePackage")(config),
        list: require("./lib/getPackages")(config)
    };
}
