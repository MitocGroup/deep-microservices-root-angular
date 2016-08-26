'use strict';

let exec = require('child_process').exec;
let path = require('path');
let fs = require('fs');
let watch = require('watch');
let walk = require('walk');
let mkdirp = require('mkdirp');

/**
 * @param {String} fullPath - relative path to package.json folder from microapplication
 * @param {Boolean} prodFlag
 */
function installNodeModules(fullPath, prodFlag) {
  let flag = prodFlag ? '--production' : '';

  return new Promise(resolve => {
    try {
      if (fs.statSync(path.join(fullPath, 'node_modules')).isDirectory()) {
        return resolve();
      }
    } catch(error) {
      console.log('Installing node modules');
    }


    exec(`cd ${fullPath} && npm install ${flag}`, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
      }

      return resolve();
    });
  });
}

/**
 * Watch html and javascript files of a specific microapplication
 * @param {String} frontendPath - path to frontend folder of the microapplication
 */
function watchMicroservice(frontendPath, typescriptPath) {

  function _buildPath(file) {
    return path.join(frontendPath, _destinationFolderName(), file.replace(frontendPath, ''));
  }

  function _copyFile(file) {
    if (_testFileName(file)) {
      fs.createReadStream(file).pipe(fs.createWriteStream(_buildPath(file)));
    }
  }

  let options  = {
    ignoreDirectoryPattern: /(\/_build)/,
  };

  watch.createMonitor(frontendPath, options, (monitor) => {
    monitor.on('created', _copyFile);

    monitor.on('changed', _copyFile);

    monitor.on('removed', (file) => {
      if (_testFileName(file)) {
        fs.unlink(_buildPath(file));
      }
    });
  });

  return new Promise((resolve) => {
    exec(`cd ${typescriptPath} && tsc -w`, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
      }
    });

    resolve();
  });
}

/**
 * Copy html and javascript files on first start
 * @param {String} frontendPath
 */
function initializeApplication(frontendPath) {
  let stat, walkerPromise, tscPromise;

  try {
    stat = fs.statSync(path.join(frontendPath, _destinationFolderName()));

    if (stat.isDirectory()) {
      return new Promise(resolve => resolve());
    }
  } catch(error) {
    console.log('Initialize application');
  }

  function _buildPath(file) {
    return path.join(frontendPath, _destinationFolderName(), file.replace(frontendPath, ''));
  }

  function _copyFile(file) {
    if (_testFileName(file)) {
      return fs.createReadStream(file).pipe(fs.createWriteStream(_buildPath(file)));
    }

    return false;
  }

  let walker = walk.walk(frontendPath);

  walkerPromise = new Promise ((resolve) => {
    walker.on('file', (root, fileStats, next) => {
      let fullPath = path.join(root, fileStats.name);

      mkdirp(path.dirname(_buildPath(fullPath)), (error) => {
        if (error) {
          console.error(error);

          return next();
        }

        _copyFile(fullPath);

        next();
      });
    });

    walker.on('end', resolve);
  });

  tscPromise = new Promise((resolve) => {
    exec(`cd ${frontendPath} && tsc`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error during compiling: ',stderr);
      }

      return resolve();
    });
  });

  return Promise.all([walkerPromise, tscPromise]);
}

/**
 * Check if file is not typescript
 * @param fileName
 * @returns {boolean}
 * @private
 */
function _testFileName(fileName) {
  return !(/\.(ts)$/.test(fileName));
}

/**
 * Destination of the compiled files
 * @returns {String}
 * @private
 * @todo: change when compiling will be in other folder
 */
function _destinationFolderName() {
  return '_build';
}

module.exports = {
  installNodeModules: installNodeModules,
  watchMicroservice: watchMicroservice,
  initializeApplication: initializeApplication
};
