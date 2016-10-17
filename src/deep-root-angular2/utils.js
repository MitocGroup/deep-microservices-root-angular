'use strict';

/*eslint global-require: 0 */
/*eslint no-use-before-define: 0 */
/*eslint no-empty: 0 */

let exec = require('child_process').exec;
let path = require('path');
let fs = require('fs');
let os = require('os');

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
function watchMicroservice(frontendPath) {
  return new Promise((resolve) => {
    exec(
      `cd ${frontendPath} && webpack --config webpack.config.js --progress --profile --watch`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(stderr);
        }
      }
    );

    resolve();
  });
}

/**
 * Copy html and javascript files on first start
 * @param {String} frontendPath
 */
function initializeApplication(frontendPath) {
  let property = this.microservice.property;
  let bootstrapFiles = [];
  let rootJsPath = path.join(__dirname, 'frontend', 'js');

  property.microservices.forEach(microservice => {
    if (!microservice.isRoot) {
      let microservicePath = microservice.autoload.frontend;
      let bootstrapFile = path.join(microservicePath, 'bootstrap.ts');
      
      if (fs.existsSync(bootstrapFile)) {
        let relativePath = path.relative(
          rootJsPath,
          bootstrapFile
        );
        
        bootstrapFiles.push(relativePath);
      }
    }
  });

  let msJsTemplate = bootstrapFiles.map(file => `export * from "${file}"; ${os.EOL}`);

  fs.writeFileSync(path.join(rootJsPath, 'microservices.ts'), msJsTemplate);

  return new Promise((resolve) => {
    exec(`cd ${frontendPath} && webpack --config webpack.config.js --progress --profile`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error during compiling: ',stderr);
      }

      return resolve();
    });
  });
}

module.exports = {
  installNodeModules: installNodeModules,
  watchMicroservice: watchMicroservice,
  initializeApplication: initializeApplication,
};
