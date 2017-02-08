'use strict';

var exec = require('child_process').exec;
var utils = require('./utils');

function installGlobalDependencies(globalDeps) {
  var promises = [];

  for (let depKey in globalDeps) {
    if (!globalDeps.hasOwnProperty(depKey)) {
      continue;
    }

    let dep = globalDeps[depKey];

    let promise = new Promise((resolve) => {
      exec(`which ${depKey}`, (error, stdout, stderr) => {
        if (stdout) {
          return resolve();
        }

        if (stderr) {
          console.error(`Error checking for ${dep} dependency globally. ${stderr}`);
          return resolve();
        }

        console.log(`Installing ${dep} globally.`);

        exec(`npm install -g ${dep}`, (error) => {
          if (error) {
            console.error(`Error installing ${dep} dependency globally. ${error}`);
          }

          return resolve();
        })
      });
    });

    promises.push(promise);
  }

  return Promise.all(promises);
}

module.exports = function(callback) {
  var deps = {
    'tsc': 'typescript',
    'typings': 'typings'
  };

  installGlobalDependencies(deps).then(() => utils.installNodeModules.call(this))
    .then(callback)
    .catch((error) => {
      console.error(error);

      callback();
    });
};
