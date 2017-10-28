// @flow
import request from "request";

export const requestOptions: Object = {
  headers: {
    "User-Agent": "qilin-editor",
  },
};

export function parseRepository(link: string): Object {
  let branch: string = "master";
  let owner: string = link.split("/")[0];
  let name: string = link.split("/")[1];

  if (name.indexOf("#") > -1) {
    branch = name.split("#")[1];
    name = name.split("#")[0];
  }

  return {owner, name, branch};
}

export function getArchiveLink(repo: string | Object): string {
  if (typeof repo !== "object") {
    repo = parseRepository(repo);
  }

  return `https://github.com/${repo.owner}/${repo.name}/archive/${repo.branch}.zip`;
}

export function getArchiveDir(link: string): string {
  let dir: Array<string> = link.split("/");

  return `${dir[dir.length - 3]}-${dir[dir.length - 1]}`.slice(0, -4);
}

export function getRawFileLink(repo: string | Object, file: string): string {
  if (typeof repo !== "object") {
    repo = parseRepository(repo);
  }

  return `https://raw.githubusercontent.com/${repo.owner}/${repo.name}/${repo.branch}/${file}`;
}

export function getOrganizationRepos(
  organization: string,
  filter?: string
): Promise<Array<Object>> {
  const url = `https://api.github.com/orgs/${organization}/repos`;
  const req = request.defaults({
    ...requestOptions,
  });

  return new Promise((resolve, reject) => {
    req(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        try {
          const result:Array<Object> = JSON.parse(body);
          const output: Array<Object> = [];

          if (filter) {
            for (const repo of result) {
              if (repo.name.includes(filter)) {
                output.push(repo);
              }
            }
          }

          resolve(output);
        } catch (error) {
          reject(body);
        }
      }
    });
  });
}

export function getRepositoryPackage(
  repo: string | Object,
  config: Object = {}
): Promise<Object> {
  if (typeof repo !== "object") {
    repo = parseRepository(repo);
  }

  const req = request.defaults({
    ...requestOptions,
    proxy: config.proxy,
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
