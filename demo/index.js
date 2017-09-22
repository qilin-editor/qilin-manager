var manager = require("../dist/index");

var Manager = manager({
    // …
});

let downloads = [
    Manager.install("kevva/download"),
    Manager.install("kevva/brightness"),
    Manager.install("kevva/screenshot-stream")
];

Promise.all(downloads).then(() => {
    Manager.update();
});
