const QPM = require("../dist/index");
const qpm = new QPM();

Promise.all([
  qpm.install("Bartozzz/crawlerr", "plugins"),
  qpm.install("kevva/download", "themes"),
  qpm.install("kevva/brightness", "themes"),
  qpm.install("kevva/screenshot-stream", "themes"),
]).then(() => {
  return qpm.update("themes");
}).then(() => {
  qpm.list("themes").then(console.log);
  qpm.list("plugins").then(console.log);
}).then(() => {
  return qpm.load("Bartozzz/crawlerr", "plugins").then((plugin) => {
    const crawlerr = plugin({test: "A"});
    console.log(crawlerr);
  }).catch((err) => {
    console.log(err);
  });
}).then(() => {
  return qpm.search("qilin-editor", "qilin-logo").then((packages) => {
    console.log(packages);
  }).catch((error) => {
    console.log(error);
  });
});
