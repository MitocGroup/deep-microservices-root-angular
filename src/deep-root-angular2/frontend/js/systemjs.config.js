'use strict';

System.register([], function (exportMethod) {
  var config, map, packages, ngPackageNames, setPackageConfig;

  // map tells the System loader where to look for things
  map = {
    '@angular': 'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs': 'node_modules/rxjs'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  packages = {
    'rxjs': {main: 'Rx.js', defaultExtension: 'js'},
    'angular2-in-memory-web-api': {main: 'index.js', defaultExtension: 'js'},
  };

  ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/' + pkgName] = {main: 'index.js', defaultExtension: 'js'};
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/' + pkgName] = {main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js'};
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  config = {
    map: map,
    packages: packages
  };

  exportMethod('config', config);

  return {
    setters: [],
    execute: function() {}
  };
});
