'use strict';

/* eslint global-require: 0 */

const path = require('path');
const fs = require('fs');
const webpackMerge = require('webpack-merge');
const _root = path.resolve(__dirname, '..');

const ROOT_ANGULAR2_IDENTIFIER = 'deep-root-angular2';
const DEEPKG_FILE = 'deepkg.json';
const WEBPACK_CONFIG_FILE = 'webpack.config.js';
const DEFAULT_FRONTEND_PATH = 'frontend';

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function getMicroservicesPaths() {
  let propertyPath = path.join(__dirname, '..', '..', '..');
  let files = fs.readdirSync(propertyPath);
  let paths = [];

  for (let i in files) {
    if (!files.hasOwnProperty(i)) {
      continue;
    }

    let file = files[i];
    let fullPath = path.join(propertyPath, file);

    if (fs.statSync(fullPath).isDirectory() &&
      fs.existsSync(path.join(fullPath, DEEPKG_FILE)) &&
      file !== ROOT_ANGULAR2_IDENTIFIER) {

      paths.push(fullPath);
    }
  }

  return paths;
}

function webpackDepsConfig() {
  let paths = getMicroservicesPaths();

  return paths.reduce((webpackConfig, msPath) => {
    let deepkgFile = path.join(msPath, DEEPKG_FILE);
    let deepkgObj = require(deepkgFile);
    let frontendPath = (deepkgObj.autoload || {}).frontend || DEFAULT_FRONTEND_PATH;
    let webpackFile = path.join(msPath, frontendPath, WEBPACK_CONFIG_FILE);

    return fs.existsSync(webpackFile) ?
      webpackMerge(webpackConfig, require(webpackFile)) :
      webpackConfig;
  }, {});
}

function getMicroservices() {
  let paths = getMicroservicesPaths();

  return paths.map(p => path.basename(p));
}

exports.webpackDepsConfig = webpackDepsConfig;
exports.getMicroservices = getMicroservices;
exports.root = root;
