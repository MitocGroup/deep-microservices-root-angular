'use strict';

let path = require('path');
let fs = require('fs');
let _root = path.resolve(__dirname, '..');
let ROOT_ANGULAR2_IDENTIFIER = 'deep-root-angular2';
let webpackMerge = require('webpack-merge');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function webpackDepsConfig() {
  let propertyPath = path.join(__dirname, '..', '..', '..');
  let files = fs.readdirSync(propertyPath);
  let webpackConfig = {};

  for (let i in files) {
    if (!files.hasOwnProperty(i)) {
      continue;
    }

    let file = files[i];
    let fullPath = path.join(propertyPath, file);
    let webpackFile = path.join(fullPath, 'frontend', 'webpack.config.js');

    if (fs.statSync(fullPath).isDirectory() &&
      fs.existsSync(path.join(fullPath, 'deepkg.json')) &&
      file !== ROOT_ANGULAR2_IDENTIFIER &&
      fs.existsSync(webpackFile)) {

      webpackConfig = webpackMerge(require(webpackFile), webpackConfig);
    }
  }
  
  return webpackConfig;
}

function getMicroservices() {
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
      fs.existsSync(path.join(fullPath, 'deepkg.json')) &&
      file !== ROOT_ANGULAR2_IDENTIFIER) {
      paths.push(file);
    }
  }
  
  return paths;
}

exports.webpackDepsConfig = webpackDepsConfig;
exports.getMicroservices = getMicroservices;
exports.root = root;
