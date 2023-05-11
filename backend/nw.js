/* eslint-disable no-undef */
const path = require("path");
const Service = require("node-windows").Service;
// Create a new service object
const svc = new Service({
  name: "ThemeAdmin",
  description: "The ThemeAdmin web server.",
  script: path.resolve("../backend/dist/index.js"),
  // nodeOptions: ["--harmony", "--max_old_space_size=4096"],
  wait: 1,
  grow: 0.25,
});

svc.on("install", function () {
  svc.start();
  console.log("Install complete!");
});

svc.on("uninstall", () => {
  console.log("Uninstall complete!");
});

svc.on("alreadyinstalled", () => {
  console.log("This service is already installed.");
});

if (svc.exists) return svc.uninstall();
svc.install();
