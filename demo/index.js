const path = require("path");
const manager = require("../dist/index").default;

const Manager = manager({
  dest: path.resolve(__dirname, "./packages"),
});

Promise.all([
  Manager.install("Bartozzz/crawlerr", "plugins"),
  Manager.install("kevva/download", "themes"),
  Manager.install("kevva/brightness", "themes"),
  Manager.install("kevva/screenshot-stream", "themes"),
]).then(() => {
  Manager.update("themes");
}).then(() => {
  Manager.list("themes").then(console.log);
  Manager.list("plugins").then(console.log);
});
