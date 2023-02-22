const path = require("path");

module.exports = {
  mode: "development",
  entry: "./assets/javascript/app.js",
  output: {
    path: path.resolve(__dirname, "src"),
    filename: "bundle.js",
  },
  watch: true,
};
