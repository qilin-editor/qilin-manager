import path from "path";
import { exec } from "child_process";
import download from "download";
import * as GitHubUtils from "./utils/GitHubUtils";

export default function (config) {
    function prepare(pack) {
        return new Promise(resolve => {
            exec("npm run prepare", {
                cwd: pack
            }, (error, stdout) => {
                console.info(`[qilin-manager] Preparing: ${pack}`);

                resolve(stdout);
            });
        });
    }

    function install(pack) {
        return new Promise(resolve => {
            exec("npm install", {
                cwd: pack
            }, (error, stdout) => {
                console.info(`[qilin-manager] Installing dependencies for: ${pack}`);

                resolve(stdout);
            });
        });
    }

    return (link) => {
        const repo = GitHubUtils.parseRepository(link);
        const archive = GitHubUtils.getArchiveLink(repo);

        console.info(`[qilin-manager] Installing: ${archive}`);

        return download(archive, config.dest, {
            extract: config.extract,
            proxy: config.proxy
        }).then(() => {
            const dir = GitHubUtils.getArchiveDir(archive);
            const pack = path.resolve(config.dest, dir);

            return install(pack).then(() => prepare(pack));
        });
    };
}
