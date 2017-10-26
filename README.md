<div align="center">
  <h1>Qilin package manager</h1>
  <br>

**qilin-manager** is a simple and minimal package manager which allows you to install plugins and themes for [Qilin](https://github.com/qilin-editor/qilin-app). Packages are downloaded and prepared from GitHub.
</div>

>**Disclaimer**: `qilin-manager` *is not a replacement for NPM, Yarn or any other package manager*. In fact, `qilin-manager` was created especially with [Qilin](https://github.com/qilin-editor/qilin-app) in mind and relies on NPM itself.

<h2 align="center">Installation</h2>

```bash
$ npm install qilin-manager
```

<h2 align="center">Usage</h2>

```javascript
import QilinManager from "qilin-manager";

const qpm = QilinManager({
  // …
});
```

### *Example 1: Download multiple packages*

```javascript
Promise.all([
  qpm.install("kevva/download"),
  qpm.install("kevva/brightness"),
  qpm.install("kevva/screenshot-stream")
]).then(() => {
  console.log("Done!");
});
```

### *Example 2: List downloaded packages*

You can list packages installed globally, or under a specific namespace with `qpm.list(namespace: ?string)`.

```javascript
const all = await qpm.list();
const themes = await qpm.list("themes");
const plugins = await qpm.list("plugins");
```

### *Example 3: Update downloaded packages*

You can update packages installed globally (or under a certain namespace) with `qpm.update(namespace: ?namespace)`.

```javascript
qpm.update().then(/* … */);
qpm.update("themes").then(/* … */);
qpm.update("plugins").then(/* … */);
```

### *Example 4: Building a package*

Packages are builded automatically once they are downloaded from GitHub. If for any reason you need to rebuild a package manually, you can use `qpm.build(directory: string)`.

```javascript
qpm.build("path/to/directory").then(/* … */);
```
