'use strict';

/*eslint global-require: 0 */
/*eslint no-use-before-define: 0 */
/*eslint no-empty: 0 */

let exec = require('child_process').exec;
let path = require('path');
let fs = require('fs');
let os = require('os');

let PACKAGE_JSON_FILE = 'package.json';
let NODE_MODULES_DIR = 'node_modules';

/**
 * @param {String|undefined} env
 */
function installNodeModules(env) {
  let envArg = env ? `--${env}` : '';
  let microservices = this.microservice.property.microservices;

  return Promise.all(microservices.map(microservice => {
    let frontendPath = microservice.autoload.frontend;
    let packageFile = path.join(frontendPath, PACKAGE_JSON_FILE);
    let nodeModulesDir = path.join(frontendPath, NODE_MODULES_DIR);

    if (!fs.existsSync(packageFile) || fs.existsSync(nodeModulesDir)) {
      return Promise.resolve(null);
    }

    console.log(`Installing node_modules for "${microservice.identifier}"`);

    return new Promise(resolve => {
      exec(`cd ${frontendPath} && npm install ${envArg}`, (error, stdout, stderr) => {
        if (error) {
          console.error(stderr);
        }

        resolve();
      });
    });
  }));
}

/**
 * Watch html and javascript files of a specific microapplication
 * @param {String} frontendPath - path to frontend folder of the microapplication
 */
function watchMicroservice(frontendPath) {
  return new Promise((resolve) => {
    exec(
      `cd ${frontendPath} && webpack --config webpack.config.js --watch`,
      {maxBuffer: 1024 * 1024},
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

  let msJsTemplate = bootstrapFiles.map(file => `export * from "${file}";`).join(os.EOL);

  fs.writeFileSync(path.join(rootJsPath, 'microservices.ts'), msJsTemplate);

  return new Promise((resolve) => {
    exec(`cd ${frontendPath} && webpack --config webpack.config.js`, (error, stdout, stderr) => {
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
