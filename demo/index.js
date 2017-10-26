const path = require("path");
const manager = require("../dist/index").default;

const Manager = manager({
  dest: path.resolve(__dirname, "./packages"),
});

let downloads = [
  Manager.install("Bartozzz/crawlerr"),
  Manager.install("kevva/download"),
  Manager.install("kevva/brightness"),
  Manager.install("kevva/screenshot-stream"),
];

Promise.all(downloads).then(() => {
  Manager.update();
  Manager.list().then(console.log);
});
