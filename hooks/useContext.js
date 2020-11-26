const fs = require("fs");
const path = require("path");

/**
 * 
 * The context function help to load context from a path
 * All files from a path using regular expression
 * Returns an array of full path file
 * 
 * @param {string} base 
 * @param {boolean} scanSubDirectories 
 * @param {RegEx} regularExpression
 * @author Acidiney Dias <hello@acidineydias.me>
 * 
 * @returns { Object[] }
 */
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
