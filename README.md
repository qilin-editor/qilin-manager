<div align="center">
  <h1>Qilin package manager</h1>

[![Greenkeeper badge](https://badges.greenkeeper.io/qilin-editor/qilin-manager.svg)](https://greenkeeper.io/)
[![Build Status](https://img.shields.io/travis/qilin-editor/qilin-manager.svg)](https://travis-ci.org/qilin-editor/qilin-manager/)
[![License](https://img.shields.io/github/license/qilin-editor/qilin-manager.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/qilin-manager.svg)](https://www.npmjs.com/package/qilin-manager)
[![npm downloads](https://img.shields.io/npm/dt/qilin-manager.svg)](https://www.npmjs.com/package/qilin-manager)
  <br>

**qilin-manager** is a simple and minimal package manager which allows you to install plugins and themes for [Qilin](https://github.com/qilin-editor/qilin-app). Packages are downloaded and prepared from GitHub.
</div>

<h2 align="center">Installation</h2>

```bash
$ npm install qilin-manager
```

<h2 align="center">Usage</h2>

```javascript
import QilinManager from "qilin-manager";

const qpm = new QilinManager();
```

### [Installing packages](src/lib/commands/install.js)
`qpm.install(package: string, namespace?: string): Promise`

Asynchronously installs a specified package from GitHub. Once downloaded, the package is extracted in `dest` directory and properly prepared: its dependencies are downloaded by NPM and build scripts are launched.

**Example:**
```javascript
Promise.all([
  qpm.install("userA/repo"),
  qpm.install("userB/repo", "namespaceB"),
  qpm.install("userC/repo", "namespaceC")
]).then(() => {
  console.log("Done!");
});
```

### [Listing packages](src/lib/commands/list.js)
`qpm.list(namespace?: string): Promise`

Asynchronously returns a list of installed packages in `dest` directory under a given namespace. The returned list is an object whose keys correspond to packages names and values are objects containing:
- `namespace`: plugin namespace;
- `directory`: plugin parent directory;
- `version`: same as in `package.json`;
- `package` : full path to `package.json`;

**Example:**
```javascript
const all = await qpm.list();
const themes = await qpm.list("themes");
const plugins = await qpm.list("plugins");
```

**Example output:**
```json
{
    "packageA": {
        "namespace": "namespaceA",
        "directory": "packageA-master",
        "version": "x.x.x",
        "package": "[…]/namespaceA/packageA-master/package.json"
    },
    "packageB": {
        "namespace": "namespaceB",
        "directory": "packageB-master",
        "version": "x.x.x",
        "package": "[…]/namespaceB/packageB-master/package.json"
    }
}
```

### [Updating packages](src/lib/commands/update.js)
`qpm.update(namespace?: string): Promise`

Asynchronously checks if locally installed packages under a certain namespace are up-to-date. If no, they are downloaded again.

**Example:**
```javascript
qpm.update().then(/* … */);
qpm.update("themes").then(/* … */);
qpm.update("plugins").then(/* … */);
```

### [Loading a package](src/lib/commands/load.js)
`qpm.load(package: string, namespace?: string): Promise`

Asynchronously loads then executes a script in a virtual machine (V8 sandbox) and returns it's `module.exports` back to the client. All the dependencies are resolved automatically.

**Example:**
```javascript
const MyPlugin = await qpm.load("user/repo", "plugins");
const instance = new MyPlugin(…);
```

### [Searching for packages](src/lib/commands/search.js)
`qpm.search(organization: string, filter?: string): Promise`

Asynchronously searches a GitHub organization for repositories matching a specified filter.

**Example:**
```javascript
const plugins = await qpm.search("organization", "project-plugin-");
const themes = await qpm.search("organization", "project-theme-");
```

**Example output:**

Refer to [GitHub API](https://developer.github.com/v3/repos/#list-organization-repositories).

### [Building a package](src/lib/commands/build.js)

>**Note**: packages are built automatically once installed using `qpm.install`.

Installs dependencies for a given package and executes several [NPM scripts](https://docs.npmjs.com/misc/scripts) in order to build the plugin. Scripts are executes in the order below:
1. `preinstall`;
2. `install`;
3. `postinstall`;
4. `prepare`;

**Example:**
```javascript
qpm.build("full/path/to/package_A").then(/* … */);
qpm.build("full/path/to/package_B").then(/* … */);
```

<h2 align="center">Configuration</h2>

You can configure `qilin-manager` using environment variables.

| Variable | Description | Default |
|----------|-------------|---------|
| `DEBUG=qilin:*` | Outputs debug informations in terminal | `undefined` |
| `QPM_HOME` | Destination path for downloaded packages | `HOME/.qpm/` |
| `QPM_PROXY` | Custom proxy settings | `undefined` |
