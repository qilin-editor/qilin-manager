import getPackages from "./getPackages";
import installPackage from "./installPackage";
import * as GitHubUtils from "./utils/GitHubUtils";

export default function (config) {
    return () => {
        getPackages(config.dest)().then(locals => {
            let promises = [];
            const install = installPackage(config);

            Object.keys(locals).forEach(id => {
                promises.push(GitHubUtils.getRepositoryPackage(id, config));
            });

            return Promise.all(promises)
                .then(externals => {
                    promises = [];

                    externals.forEach(external => {
                        const version = locals[external.repository];

                        if (external.version !== version) {
                            console.info(`[qilin-manager] Updating ${external.repository}@${version} to ${external.repository}@${external.version}`);

                            promises.push(install(external.repository));
                        } else {
                            console.info(`[qilin-manager] ${external.repository}@${external.version} up to date`);
                        }
                    });

                    return Promise.all(promises);
                })
                .catch(err => {
                    console.error(err);
                });
        });
    };
}
