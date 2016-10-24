'use strict';

var exec = require('child_process').exec;
var utils = require('./utils');

function installGlobalDependencies() {
  return new Promise((resolve) => {
    exec('which tsc', (error, stdout, stderr) => {
      if (stdout) {
        return resolve();
      }

      if (stderr) {
        console.error(stderr);
        return resolve();
      }

      console.log('Installing typescript');
      exec('npm install -g typings typescript', (error) => {
        if (error) {
          console.error(error);
        }

        return resolve();
      })
    });
  });
}

module.exports = function(callback) {
  installGlobalDependencies().then(() => utils.installNodeModules.call(this))
    .then(callback)
    .catch((error) => {
      console.error(error);

      callback();
    });
};
