'use strict';

var utils = require('./utils');

module.exports = function(callback) {
  utils.installNodeModules(__dirname, false)
    .then(callback)
    .catch((error) => {
      console.error(error);

      callback();
    });
};
