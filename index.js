/**
 * The context function help to load context from a path
 * All files from a path using regular expression
 * Returns an array of full path file
 *
 * @author Acidiney Dias <acidiney.dias@ideiasdinamicas.com>
 * @version 1.0.0
 * @returns { Array<string> }
 */

const fs = require("fs");
const path = require("path");

module.exports = (
  base = ".",
  scanSubDirectories = false,
  regularExpression = /\.js$/
) => {
  const files = {};

  function readDirectory(directory) {
    fs.readdirSync(directory).forEach((file) => {
      const fullPath = path.resolve(directory, file);

      if (fs.statSync(fullPath).isDirectory()) {
        if (scanSubDirectories) readDirectory(fullPath);

        return;
      }

      if (!regularExpression.test(fullPath)) return;

      files[fullPath] = true;
    });
  }

  readDirectory(path.resolve(__dirname, base));

  function Module(file) {
    return require(file);
  }

  Module.keys = () => Object.keys(files);

  return Module;
};
