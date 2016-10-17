var path = require('path');
var fs = require('fs');
var _root = path.resolve(__dirname, '..');
var ROOT_ANGULAR2_IDENTIFIER = 'deep-root-angular2';

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function getMicroservices() {
  var propertyPath = path.join(__dirname, '..', '..', '..');
  var files = fs.readdirSync(propertyPath);
  var paths = [];

  for (var i in files) {
    if (!files.hasOwnProperty(i)) {
      continue;
    }

    var file = files[i];
    var fullPath = path.join(propertyPath, file);

    if (fs.statSync(fullPath).isDirectory() &&
      fs.existsSync(path.join(fullPath, 'deepkg.json')) &&
      file !== ROOT_ANGULAR2_IDENTIFIER) {
      paths.push(file);
    }
  }
  
  return paths;
}

exports.getMicroservices = getMicroservices;
exports.root = root;
