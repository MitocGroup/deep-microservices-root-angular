'use strict';

let utils = require('./utils');
let path = require('path');

function hook(callback) {
  if (this.isAfter()) {
    return callback();
  }

  let directory = path.join(__dirname, 'frontend');
  return callback();
  return utils.watchMicroservice(directory, directory)
    .then(callback)
    .catch((error) => {
      console.error(error);
      return callback();
    });
}

module.exports = hook;
