import fs from "fs";
import path from "path";
import * as FilesUtils from "./utils/FilesUtils";
import * as PackagesUtils from "./utils/PackagesUtils";

export default function (source) {
    if (typeof source === "object") {
        source = source.dest;
    }

    return () => {
        console.info(`[qilin-manager] Listing from: ${source}`);

        const files = fs.readdirSync(source).map(name => path.join(source, name));
        const dirs = files.filter(FilesUtils.isDirectory);
        const promises = [];

        dirs.forEach((dir) => {
            promises.push(PackagesUtils.getPackageData(dir));
        });

        return Promise.all(promises)
            .then(packs => {
                const versions = {};

                packs.forEach(pack => {
                    console.info(`[qilin-manager] Package: ${pack.repository} v${pack.version}`);
                    versions[pack.repository] = pack.version;
                });

                return versions;
            })
            .catch(err => {
                console.error(err);
            });
    };
}
