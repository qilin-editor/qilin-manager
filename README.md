<div align="center">
  <h1>Qilin package manager</h1>
  <br>

**qilin-manager** is a simple and minimal package manager which allows you to discover and install plugins and themes for [Qilin](https://github.com/qilin-editor/qilin-app). Packages are downloaded and prepared from GitHub.
</div>

>**Disclaimer**: `qilin-manager` *is not a replacement for NPM, Yarn or any other package manager*. In fact, `qilin-manager` was created especially with [Qilin](https://github.com/qilin-editor/qilin-app) in mind and relies on NPM itself.

<h2 align="center">Installation</h2>

```bash
$ npm install qilin-manager
```

<h2 align="center">Usage</h2>

```javascript
import QilinManager from "qilin-manager";

const Manager = QilinManager({
    dest: "",       // Default: $HOME/.qilin/ - destination folder
    proxy: "",      // Default: undefined     - proxy settings
    extract: true   // Default: true          - whether to extract downloaded archive
});
```

### *Example 1: Download multiple packages*

```javascript
let downloads = [
    Manager.install("kevva/download"),
    Manager.install("kevva/brightness"),
    Manager.install("kevva/screenshot-stream")
];

Promise.all(downloads);
```

### *Example 2: List downloaded packages*

```javascript
const packages = await Manager.list();
```

### *Example 3: Update downloaded packages*

```javascript
Manager.update().then(/* … */);
```

### *Example 4: Building a package manually*

```javascript
Manager.build("path/to/directory");
```
