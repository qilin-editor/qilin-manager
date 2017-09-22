import request from "request";

export function parseRepository(link) {
    let owner = link.split("/")[0];
    let name = link.split("/")[1];
    let branch = "master";

    if (name.indexOf("#") > -1) {
        branch = name.split("#")[1];
        name = name.split("#")[0];
    }

    return {
        owner: owner,
        name: name,
        branch: branch
    };
}

export function getArchiveLink(repo) {
    if (typeof repo !== "object") {
        repo = parseRepository(repo);
    }

    return `https://github.com/${repo.owner}/${repo.name}/archive/${repo.branch}.zip`;
}

export function getArchiveDir(link) {
    let dir = link.split("/");

    return `${dir[dir.length - 3]}-${dir[dir.length - 1]}`.slice(0, -4);
}

export function getRawFileLink(repo, file) {
    if (typeof repo !== "object") {
        repo = parseRepository(repo);
    }

    return `https://raw.githubusercontent.com/${repo.owner}/${repo.name}/${repo.branch}/${file}`;
}

export function getRepositoryPackage(repo, config = {}) {
    if (typeof repo !== "object") {
        repo = parseRepository(repo);
    }

    const req = request.defaults({
        proxy: config.proxy
    });

    return new Promise((resolve, reject) => {
        req(getRawFileLink(repo, "package.json"), (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}
